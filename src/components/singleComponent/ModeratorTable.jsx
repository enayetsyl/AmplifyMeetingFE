'use client';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../shared/button';
import TableHead from '../shared/TableHead';
import TableData from '../shared/TableData';
import { BsFillEnvelopeAtFill, BsThreeDotsVertical } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { IoTrashSharp } from 'react-icons/io5';
import ViewModeratorModal from './ViewModeratorModal';
import EditModeratorModal from './EditModeratorModal';

const ModeratorTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isModeratorModalOpen, setIsModeratorModalOpen] = useState(true);
  const [isEditModeratorModalOpen, setIsEditModeratorModalOpen] = useState(true);
  
  const handleEditModeratorOpenModal = (moderator) => {
    closeModal();
    setIsEditModeratorModalOpen(true);
  };

  const handleEditModeratorCloseModal = () => {
    setIsEditModeratorModalOpen(false);
  };
  const handleModeratorOpenModal = (moderator) => {
    closeModal();
    setIsModeratorModalOpen(true);
  };

  const handleModeratorCloseModal = () => {
    setIsModeratorModalOpen(false);
  };
  const modalRef = useRef();

  const moderators = [
    // Array of moderator objects, extracted from the image
    {
      firstName: 'Juliet',
      lastName: 'Frazier',
      email: 'julietfrazier123@gmail.com',
      joinedOn: 'May 20, 2022',
      status: 'Active',
      action: 'Delete',
    },
    {
      firstName: 'Juliet',
      lastName: 'Frazier',
      email: 'julietfrazier123@gmail.com',
      joinedOn: 'May 20, 2022',
      status: 'Pending',
      action: 'Delete',
    },
    {
      firstName: 'Juliet',
      lastName: 'Frazier',
      email: 'julietfrazier123@gmail.com',
      joinedOn: 'May 20, 2022',
      status: 'Inactive',
      action: 'Delete',
    },
    {
      firstName: 'Juliet',
      lastName: 'Frazier',
      email: 'julietfrazier123@gmail.com',
      joinedOn: 'May 20, 2022',
      status: 'Active',
      action: 'Delete',
    },

    // Add other moderator objects here...
  ];

  const renderStatus = (status) => {
    const statusStyles = {
      Active: 'bg-custom-teal text-white',
      Pending: 'bg-[#1e656d] text-white',
      Inactive: 'bg-[#404040] text-white',
    };

    return (
      <div className="flex justify-start">
        <span
          className={`w-20 text-[12px] text-center py-1 rounded-full ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
    );
  };

  const getButtonVariant = (action) => {
    const actionVariants = {
      Delete: 'primary',
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
    <div className="overflow-x-auto px-10 pt-10 w-full">
      <div className="border-[0.5px] border-custom-dark-blue-1 rounded-lg w-full">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg w-full">
          <thead className="bg-custom-gray-2 rounded-lg py-2 w-full">
            <tr className="shadow-[0px_0px_26px_#00000029] w-full">
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 rounded-lg w-full">
            {moderators.map((moderator, index) => (
              <tr
                key={index}
                className="shadow-[0px_0px_26px_#00000029] w-full"
              >
                <TableData>{moderator.firstName}</TableData>
                <TableData>{moderator.lastName}</TableData>
                <TableData>{moderator.email}</TableData>
                <TableData>{moderator.joinedOn}</TableData>
                <TableData>{renderStatus(moderator.status)}</TableData>
                <td className="flex justify-between items-center gap-2 relative">
                  <Button
                    variant={getButtonVariant(moderator.action)}
                    className="w-16 text-center text-[12px] rounded-xl py-1"
                  >
                    {moderator.action}
                  </Button>
                  <BsThreeDotsVertical
                    onClick={toggleModal}
                    className="cursor-pointer"
                  />
                </td>
                {isModalOpen && (
                  <div
                    ref={modalRef}
                    className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg"
                    style={{
                      top: modalPosition.top + 20,
                      left: modalPosition.left - 30,
                    }}
                  >
                    <ul className="text-[12px]">
                      <li
                        className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                        onClick={() => handleModeratorOpenModal(moderator)}
                      >
                        <FaUser />
                        <span>View</span>
                      </li>
                        { isModeratorModalOpen && <ViewModeratorModal user={moderator} onClose={handleModeratorCloseModal}/>}
                      <li
                        className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                        onClick={() => handleEditModeratorOpenModal(moderator)}
                      >
                        <RiPencilFill />
                        <span>Edit</span>
                      </li>
                      { isEditModeratorModalOpen && <EditModeratorModal user={moderator} onClose={handleEditModeratorCloseModal}/>}
                    </ul>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModeratorTable;
