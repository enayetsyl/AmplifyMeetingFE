'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '../shared/Button';
import TableHead from '../shared/TableHead';
import TableData from '../shared/TableData';
import { BsFillEnvelopeAtFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaUser } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { IoTrashSharp } from 'react-icons/io5';
import axios from 'axios';

const ProjectTable = ({ projects, setProjects }) => {
  console.log("prop", projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef();

  const renderStatus = (status) => {
    const statusStyles = {
      Open: "bg-custom-teal text-white",
      Closed: "bg-gray-400 text-white",
      Started: "bg-custom-light-blue-1 text-white",
      Ended: "bg-custom-red text-white",
    };

    return (
      <div className="flex justify-center">
        <span
          className={`w-16 text-[12px] text-center py-1 rounded-full ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
    );
  };

  const getButtonVariant = (action) => {
    const actionVariants = {
      Start: "save",
      Delete: "closed",
      Join: "primary",
      Close: "default",
    };

    return actionVariants[action] || "default";
  };

  const toggleModal = (event, project) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setSelectedProject(project);
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleDeleteProject = async () => {
    try {
      console.log("he")
      // Ensure the endpoint URL matches your backend setu
      await axios.delete(`http://localhost:8008/api/delete/project/${selectedProject._id}`);
      setProjects((prevProjects) => prevProjects.filter(project => project._id !== selectedProject._id));
      alert('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    } finally {
      closeModal();
    }
  };

  return (
    <div className='overflow-hidden'>
      <div className="min-w-full overflow-x-auto p-8 border">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-custom-gray-2 rounded-lg py-2 w-full">
            <tr className="shadow-[0px_0px_26px_#00000029] w-full">
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
            {projects.map((project) => (
              <tr key={project._id} className='shadow-[0px_0px_26px_#00000029] w-full'>
                <TableData>{project.name}</TableData>
                <TableData>{renderStatus(project.status)}</TableData>
                <TableData>{project.creator?.name || 'N/A'}</TableData>
                <TableData>{project.moderator?.name || 'N/A'}</TableData>
                <TableData>{new Date(project.startTime).toLocaleString()}</TableData>
                <TableData>{project.participants.length}</TableData>
                <TableData>{project.observers.length}</TableData>
                <TableData>{project.breakoutRooms.length}</TableData>
                <TableData>{project.polls.length}</TableData>
                <TableData>{project.interpreters.length}</TableData>
                <td className='flex justify-between items-center gap-2 relative'>
                  <Button
                    variant={getButtonVariant('Action')} // Replace 'Action' with the actual project action
                    className='w-16 text-center text-[12px] rounded-xl py-1'
                  >
                    Action
                  </Button>
                  <BsThreeDotsVertical onClick={(e) => toggleModal(e, project)} className='cursor-pointer' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
        <div className='flex justify-end py-3'>
          {/* <Pagination 
          currentPage={2} 
          totalPages={5} 
          onPageChange={handlePageChange}
          /> */}
          </div>

      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg"
          style={{ top: modalPosition.top + 20, left: modalPosition.left - 100 }}
        >
          <ul className="text-[12px]">
            <li
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
              onClick={closeModal}
            >
              <FaUser />
              <span>View</span>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2" onClick={closeModal}>
              <RiPencilFill />
              <span>Edit</span>
            </li>
            <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2" onClick={handleDeleteProject}>
              <IoTrashSharp />
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
