import { useState } from "react";


const Dropdown = ({ options, label, onSelect }) => {
    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleSelect = (option) => {
      setSelected(option);
      setIsOpen(false);
      if (onSelect) {
        onSelect(option);
      }
    };
  
    return (
      <div className="text-left relative w-64 z-20">
        <button
          className="p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 shadow-md flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected ? selected.optionLabel : label}

          <span className="ml-2">▼</span>
        </button>
        {isOpen && (
          <ul className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg">
            {options.map((option, index) => (
              <li
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.optionLabel}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  
  export default Dropdown;