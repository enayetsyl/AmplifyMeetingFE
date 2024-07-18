'use client';
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

const Search = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg pl-14 bg-[#eaeaea]"
      />
      <div className='absolute top-1/2 left-1 -translate-y-1/2 bg-[#f3f4f5] rounded-lg p-2'>
      <CiSearch />
      </div>
    </div>
  );
};

export default Search;
