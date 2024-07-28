'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  LuArrowLeftToLine,
  LuArrowRightToLine,
  LuClipboardSignature,
} from 'react-icons/lu';
import { FaUser, FaVideo } from 'react-icons/fa';
import { BsChatSquareFill, BsChatSquareDotsFill, BsThreeDotsVertical } from 'react-icons/bs';
import { IoMdMic, IoMdMicOff, IoSend } from 'react-icons/io';
import { HiUserGroup } from 'react-icons/hi2';
import { FaFaceGrin } from 'react-icons/fa6';
import Button from '../shared/button';
import HeadingLg from '../shared/HeadingLg';
import Search from '../singleComponent/Search';
import Image from 'next/image';
import userImage from '../../../public/user.jpg'
import { RiPencilFill } from 'react-icons/ri';
import { IoRemoveCircle } from 'react-icons/io5';

const LeftSidebar = ({users, setUsers}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('participantList');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [currentUser, setCurrentUser] = useState(null);
  const modalRef = useRef();



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = () => { 
    // Write search functionality here
   }

   const toggleModal = (event, user) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setCurrentUser(user)
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleRemoveUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
   
  };

  return (
    <div
      className={`flex ${
        isSidebarOpen ? 'w-72' : 'w-16'
      } transition-width duration-300 bg-white h-screen rounded-r-xl relative px-4`}
    >
      {isSidebarOpen ? (
        <LuArrowLeftToLine
          className="absolute top-4 right-2 text-black text-sm cursor-pointer "
          onClick={toggleSidebar}
        />
      ) : (
        <LuArrowRightToLine
          className="absolute top-4 right-2 text-black text-sm cursor-pointer "
          onClick={toggleSidebar}
        />
      )}

      <div className="flex flex-col w-full ">
        {/*  */}
        {isSidebarOpen && (
          // If side bar open
          <>
          {/* Whiteboard and local recording */}
            <div className=" pt-16">
              <Button
                children="Whiteboard"
                variant="meeting"
                type="submit"
                className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
                icon={
                  <LuClipboardSignature className="bg-[#fcd860] p-1 text-white text-2xl rounded-md font-bold" />
                }
              />
              <Button
                children="Local Recording"
                variant="meeting"
                type="submit"
                className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
                icon={
                  <FaVideo className="bg-custom-orange-1 p-1 text-white text-2xl rounded-md font-bold" />
                }
              />
            </div>
            {/* Backroom chat and icon */}
            <div className='flex justify-start items-center gap-2 pt-5'>
              <BsChatSquareFill className='text-custom-dark-blue-1'/>
              <HeadingLg children='BACKROOM CHAT'/>
            </div>
            {/* chat container */}
            <div className="flex flex-col flex-grow p-4 bg-custom-gray-8 pb-5 mb-3 rounded-xl overflow-y-auto">
              <div className="flex justify-center items-center gap-2 pb-2 ">
              <Button
                children="Participants List"
                variant="default"
                type="submit"
                className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  ${activeTab === 'participantList' ? 'shadow-[0px_4px_6px_#1E656D4D]' : 'bg-custom-gray-8 border-2  border-custom-teal !text-custom-teal '}  `}
                onClick={() => handleTabClick('participantList')}
              />
             <div className='w-full relative'>
             <Button
                children="Participants Chat"
                variant="default"
                type="submit"
                className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  ${activeTab === 'participantChat' ? 'shadow-[0px_4px_6px_#1E656D4D]' : 'bg-custom-gray-8 border-2  border-custom-teal !text-custom-teal ' }  `}
                onClick={() => handleTabClick('participantChat')}
              />
              <div className='absolute -top-1 -right-1 w-3 h-3 rounded-lg bg-[#ff2b2b] shadow-[0px_1px_3px_#00000036]'></div>
             </div>
                            
              </div>
            
              {/* participants container */}
              {
                activeTab === 'participantList' && (
                  <div className="flex-grow pt-2">
                      <Search placeholder="Search Name" onSearch={handleSearch} inputClassName='!bg-[#F3F4F5] !rounded-xl ' iconClassName='!bg-[#EBEBEB]' />
               {/* participant continer */}
              {
                users?.map(user => (
                  <div className='flex justify-center items-center gap-2 py-1' key={user.id}>
                  <Image
                  src={user.image}
                  alt='user image'
                  height={40}
                  width={40}
                  className='rounded-2xl border-[3px] border-white border-solid'
                  />
                  <p className='text-[#1a1a1a] text-[10px] flex-grow'>{user.name}</p>
                  <IoMdMic/>
                  <BsChatSquareDotsFill/>
                  <BsThreeDotsVertical onClick={(event) => toggleModal(event, user)} className="cursor-pointer"/>
                 </div>
                ))
              }
              {isModalOpen && currentUser && (
               <div
                 ref={modalRef}
                 className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg w-44"
                 style={{ top: modalPosition.top + 20, left: modalPosition.left - 30 }}
               >
                 <ul className="text-[12px]">
                   <li
                     className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                     onClick={() => handleRemoveUser(currentUser.id)}
                   >
                     <IoRemoveCircle  />
                     <span>Remove</span>
                   </li>
                   <li
                     className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                    //  onClick={() => handleEditModeratorOpenModal(currentModerator)}
                   >
                     <MdMoveDown />
                     <span>Move to Waiting Room</span>
                   </li>
                 </ul>
               </div>
             )}
               
                <div>
                  <h3 className="text-white">Waiting</h3>
                  {/* Add waiting list content here */}
                </div>
              </div>
                )
              }
              {
                activeTab === 'participantChat' && (
                  <div className="flex-grow pt-2">
           
               
                <div>
                  <h3 className="text-white">Waiting</h3>
                  {/* Add waiting list content here */}
                </div>
              </div>
                )
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
