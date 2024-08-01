'use client';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../shared/button';
import TableHead from '../shared/TableHead';
import TableData from '../shared/TableData';
import { BsFillEnvelopeAtFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaUser } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { IoTrashSharp } from 'react-icons/io5';

const ProjectTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef();

  const projects = [
    // Array of project objects, extracted from the image
    {
      name: 'Cross Hatching: 101',
      status: 'Closed',
      creator: 'Juliet Frazier',
      moderator: 'Juliet Frazier',
      startTime: '04/22/2022 09:00 PM',
      participants: 3,
      observers: 23,
      breakoutRooms: 4,
      polls: 4,
      interpreters: 2,
      action: 'Start',
    },
    {
      name: 'Cross Hatching: 102',
      status: 'Open',
      creator: 'Juliet Frazier',
      moderator: 'Juliet Frazier',
      startTime: '04/22/2022 09:00 PM',
      participants: 3,
      observers: 23,
      breakoutRooms: 4,
      polls: 4,
      interpreters: 2,
      action: 'Delete',
    },
    {
      name: 'Cross Hatching: 103',
      status: 'Started',
      creator: 'Juliet Frazier',
      moderator: 'Juliet Frazier',
      startTime: '04/22/2022 09:00 PM',
      participants: 3,
      observers: 23,
      breakoutRooms: 4,
      polls: 4,
      interpreters: 2,
      action: 'Join',
    },
    {
      name: 'Cross Hatching: 104',
      status: 'Ended',
      creator: 'Juliet Frazier',
      moderator: 'Juliet Frazier',
      startTime: '04/22/2022 09:00 PM',
      participants: 3,
      observers: 23,
      breakoutRooms: 4,
      polls: 4,
      interpreters: 2,
      action: 'Close',
    },
    // Add other project objects here...
  ];

  const renderStatus = (status) => {
    const statusStyles = {
      Open: 'bg-custom-teal text-white',
      Closed: 'bg-gray-400 text-white',
      Started: 'bg-custom-light-blue-1 text-white',
      Ended: 'bg-custom-red text-white',
    };

    return (
      <div className="flex justify-center">
        <span className={`w-16 text-[12px] text-center py-1 rounded-full ${statusStyles[status]}`}>
          {status}
        </span>
      </div>
    );
  };

  const getButtonVariant = (action) => {
    const actionVariants = {
      Start: 'save',
      Delete: 'closed',
      Join: 'primary',
      Close: 'default',
    };

    return actionVariants[action] || 'default';
  };

  const toggleModal = (event) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
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

  return (
    <div className='overflow-hidden'>
      <div class="min-w-full overflow-x-auto p-8 border">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-custom-gray-2 rounded-lg py-2 w-full">
            <tr className='shadow-[0px_0px_26px_#00000029] w-full'>
              <TableHead>Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Moderator (Host)</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Observers</TableHead>
              <TableHead>Breakout Rooms</TableHead>
              <TableHead>Polls</TableHead>
              <TableHead>Interpreters</TableHead>
              <TableHead>Actions</TableHead>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 rounded-lg">
            {projects.map((project, index) => (
              <tr key={index} className='shadow-[0px_0px_26px_#00000029] w-full'>
                <TableData>{project.name}</TableData>
                <TableData>{renderStatus(project.status)}</TableData>
                <TableData>{project.creator}</TableData>
                <TableData>{project.moderator}</TableData>
                <TableData>{project.startTime}</TableData>
                <TableData>{project.participants}</TableData>
                <TableData>{project.observers}</TableData>
                <TableData>{project.breakoutRooms}</TableData>
                <TableData>{project.polls}</TableData>
                <TableData>{project.interpreters}</TableData>
                <td className='flex justify-between items-center gap-2 relative'>
                  <Button variant={getButtonVariant(project.action)}
                    className='w-16 text-center text-[12px] rounded-xl py-1'
                  >{project.action}</Button>
                  <BsThreeDotsVertical onClick={toggleModal} className='cursor-pointer' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg"
          style={{ top: modalPosition.top + 20, left: modalPosition.left - 30 }}
        >
          <ul className='text-[12px]'>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2" onClick={closeModal}>
              <FaUser />
<span>View</span>

            </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2" onClick={closeModal}>
              <RiPencilFill/>
              <span>Edit</span>
              </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2" onClick={closeModal}>
              <IoTrashSharp/>
              <span>Delete</span>
          
              </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2" onClick={closeModal}>
              <BsFillEnvelopeAtFill />
              <span>Resend Email</span>
              
              </li>
          </ul>
        </div>
      )}
    </div>

  );
};

export default ProjectTable;
