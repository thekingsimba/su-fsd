import { useState, useEffect } from "react";
import { fileSortingOptions } from "../constant/constant";
import { fetchCsvData } from "../services/api-services";
import Dropdown from "../components/dropdown";
import Card from "../components/card";

export default function Home() {
  const [data, setData] = useState([]);

  const getFileData = async (sortKey, sortingOrder) => {
    const filedata = await fetchCsvData(sortKey, sortingOrder);
    setData(filedata);
  };

  const handleDropdownChange = (selectedOption) => {
    const { sortKey, sortingOrder } = selectedOption.optionValue;
    getFileData(sortKey, sortingOrder);
  };

  useEffect(() => {
    const { sortKey, sortingOrder } = fileSortingOptions[0].optionValue;
    getFileData(sortKey, sortingOrder);
  }, []);

  return (
    <div className="w-[80%] m-auto text-center">
      <div className="flex justify-center items-center mt-4 mb-15">
        <Dropdown
          options={fileSortingOptions}
          label="Sort files by:"
          onSelect={handleDropdownChange}
        />
      </div>

      <div className="mt-4">
        <div className="grid grid-flow-col grid-rows-6 gap-4">
          {data.map((item, index) => (
            <div key={index}>
              <Card
                index={index + 1}
                date={item.created}
                fileName={item.filename}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
