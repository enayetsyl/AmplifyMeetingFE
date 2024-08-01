'use client';
import Button from '@/components/shared/button';
import Dropdown from '@/components/shared/Dropdown';
import Search from '@/components/singleComponent/Search';
import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiRefreshCw } from "react-icons/fi";
import { statusOptions } from '@/constant/Index';
import NoSearchResult from '@/components/singleComponent/NoSearchResult';
import ProjectTable from '@/components/singleComponent/ProjectTable';

const page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Add your search logic here
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    // Add your status select logic here
  };

  const handleRefresh = () => {
    // Add your refresh logic here
  };

  

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center">
      {/* <DashboardNavbar/> */}
      {/* Navbar */}
      <div className="bg-white h-20 w-full border-b">
       
        <div className="px-10 flex justify-between items-center pt-5">
          {/* left div */}
          <div>
            <p className="text-2xl font-bold text-custom-teal">Projects</p>
          </div>
          {/* right div */}
          <div className="flex justify-center items-center gap-4">
            <Button
              children="Add New Projcect"
              type="submit"
              variant="default"
              icon={<MdAdd />}
              className="rounded-xl w-[200px] text-center py-3 shadow-[0px_3px_6px_#2976a54d]"
            />
          </div>
        </div>
      </div>
      {/* search bar */}
      <div className=" w-full bg-white">
        <div className="p-5 flex justify-between items-center ">
          <Search placeholder="Search project name" onSearch={handleSearch} />
          <div className='flex justify-center items-center gap-5'>
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-custom-dark-blue-1 text-2xl font-bold">
              Status
            </h1>
            <Dropdown
              options={statusOptions}
              selectedOption={selectedStatus}
              onSelect={handleStatusSelect}
            />
          </div>
          <Button
          children='Refresh'
          icon={<FiRefreshCw/>}
          variant='plain'
          type='submit'
          className='font-semibold'
          />
          </div>
          {/* <RefreshButtonComponent onRefresh={handleRefresh} /> */}
        </div>
      </div>
      {/* Body */}
      <div className="flex-grow mx-auto">
        {/* <NoSearchResult/> */}
        <ProjectTable/>
      </div>
    </div>
  );
};

export default page;
