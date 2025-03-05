import { useState, useEffect } from "react";
import { fileSortingOptions } from "../constant/constant";
import { fetchCsvData } from "../services/api-services";
import Dropdown from "../components/dropdown";

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
    <div className="text-center">
      <div className="flex justify-center items-center mt-4 mb-4">
        <Dropdown
          options={fileSortingOptions}
          label="Sort files by:"
          onSelect={handleDropdownChange}
        />
      </div>

      <div className="mt-4">
        <div className="grid grid-flow-col grid-rows-4 gap-4">
          {data.map((item, index) => (
            <div key={index}>
              <div>{`${item.created}`}</div>
              <div>{`${item.filename}`}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
