import { baseUrl } from "../config/config";


export const fetchCsvData = async (sortKey, sortingOrder) => {
    const apiUrl = `${baseUrl}/api/file-content?sortByKey=${sortKey}&order=${sortingOrder}`;

    try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
      console.error(`"Error fetching data:"`);
    }
  };

