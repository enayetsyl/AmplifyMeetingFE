'use client';
import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

const Dropdown = ({ options, selectedOption, onSelect, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const defaultWidthClass = className.includes('w-') ? '' : 'w-48';

  return (
    <div className={`relative ${className} `}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-1 sm:py-2 border border-[#000000] rounded-lg flex items-center justify-between ${defaultWidthClass} text-custom-dark-blue-1 font-semibold`}
      >
        {selectedOption}
        <FaAngleDown
          className={`ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      {isOpen && (
        <ul className={`absolute left-0 text-xs bg-white rounded-lg shadow-[0px_3px_6px_#00000029] text-custom-dark-blue-1 font-semibold ${defaultWidthClass}`}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
