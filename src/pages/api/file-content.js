import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'public', 'data.csv');

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');

        let jsonData = data
            .trim()
            .split('\n')
            .map(line => {
                const [created, filename] = line.split(';');
                return { created, filename };
            });

        const { sortByKey = 'created', order = 'ascendent' } = req.query;

        if (!['created', 'filename'].includes(sortByKey)) {
            return res.status(400).json({ error: "Invalid 'sortByKey'. Must be 'created' or 'filename'." });
        }

        if (!['ascendent', 'descendent'].includes(order) && sortByKey === 'filename') {
            return res.status(400).json({ error: "Invalid 'order'. Must be 'ascendent' or 'descendent' for 'filename'." });
        }

        const parseFilename = (filename) => {
            return filename.match(/\d+|\D+/g)?.map(part => (isNaN(part) ? part : Number(part))) || [];
        };

        const filenameSort = (a, b) => {
            const aParts = parseFilename(a.filename);
            const bParts = parseFilename(b.filename);

            for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
                if (aParts[i] === undefined) return -1;
                if (bParts[i] === undefined) return 1;
                if (aParts[i] !== bParts[i]) {
                    return aParts[i] > bParts[i] ? 1 : -1;
                }
            }
            return 0;
        };

        jsonData.sort((a, b) => {
            if (sortByKey === 'filename') {
                return order === 'ascendent' ? filenameSort(a, b) : filenameSort(b, a);
            } else {
                return a.created.localeCompare(b.created);
            }
        });

        res.status(200).json(jsonData);
    } catch (error) {
        res.status(500).json({ error: 'Error reading file' });
    }
}

