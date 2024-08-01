'use client';
import Button from '@/components/shared/button';
import Dropdown from '@/components/shared/Dropdown';
import Search from '@/components/singleComponent/Search';
import { projectStatusOptions } from '@/constant/Index';
import { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { MdAdd } from 'react-icons/md';
import { BsEnvelopeCheckFill } from 'react-icons/bs';
import InviteModeratorModal from '@/components/singleComponent/InviteModeratorModal';
import ModeratorTable from '@/components/singleComponent/ModeratorTable';

const page = () => {
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [showInviteModeratorModal, setShowInviteModeratorModal] =
    useState(false);

  // Project status related functionality

  const handleSearch = () => {};
  
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    // Add your status select logic here
  };

  // Modal  functionality

  const handleOpenInviteModeratorModal = () => { 
    setShowInviteModeratorModal(true)
   }

  const handleModalClose = () => { 
    setShowInviteModeratorModal(false)
   }

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center">
      {/* Navbar */}
      <div className="bg-white py-5 border-b border-solid border-gray-400 w-full">
        {' '}
        <div className="px-10 flex justify-between items-center ">
          {/* left div */}
          <div>
            <p className="text-2xl font-bold text-custom-teal">Moderators</p>
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
      <div className="border-b border-solid border-gray-400 py-4 w-full bg-white">
        <div className="px-10 flex justify-between items-center ">
          <div className="flex justify-center items-center gap-5">
            <Search placeholder="Search project name" onSearch={handleSearch} />
            <Button
              children="Invite Moderator"
              variant="save"
              type="submit"
              onClick={handleOpenInviteModeratorModal}
              icon={<BsEnvelopeCheckFill />}
              className="px-5 rounded-xl py-2"
            />
          </div>
          <div className="flex justify-center items-center gap-5">
            <div className="flex justify-center items-center gap-3">
              <h1 className="text-custom-dark-blue-1 text-2xl font-bold">
                Status
              </h1>
              <Dropdown
                options={projectStatusOptions}
                selectedOption={selectedStatus}
                onSelect={handleStatusSelect}
              />
            </div>
            <Button
              children="Refresh"
              icon={<FiRefreshCw />}
              variant="plain"
              type="submit"
              className="font-semibold"
            />
          </div>
          {/* <RefreshButtonComponent onRefresh={handleRefresh} /> */}
        </div>
      </div>
      {/* Body */}
      <div className="flex-grow w-full">
        <ModeratorTable/>
      </div>
      {showInviteModeratorModal && (
        <InviteModeratorModal onClose={handleModalClose} />
      )}
    </div>
  );
};

export default page;
