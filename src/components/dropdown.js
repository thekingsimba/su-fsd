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
      <div className="relative w-64">
        <button
          className="w-full p-3 border rounded-lg bg-white shadow-md flex justify-between items-center"
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