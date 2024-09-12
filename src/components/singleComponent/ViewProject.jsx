"use client";
import Button from "@/components/shared/button";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import HeadingLg from "@/components/shared/HeadingLg";
import Pagination from "@/components/shared/Pagination";
import ParagraphLg from "@/components/shared/ParagraphLg";
import React, { useEffect, useState } from "react";
import ParagraphBlue2 from "../shared/ParagraphBlue2";
import axios from "axios";
import MeetingTab from "../projectComponents/meetings/MeetingTab";
import AddMeetingModal from "../projectComponents/meetings/AddMeetingModal";

const ViewProject = ({ project, onClose, user, fetchProjects }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Meetings");
  const [meetings, setMeetings] = useState([]);
  const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(project?.status || '');


  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = () => {
    //Add logic here
  };

  // Fetching project meetings
  const fetchMeetings = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8008/api/get-all/meeting/${project._id}`
        // {
        //   params: { page, limit: 10 },
        // }
      );
      setMeetings(response.data.meetings);
      // setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleAddMeetingModal = () => {
    setIsAddMeetingModalOpen(true);
  };

  const closeAddMeetingModal = () => {
    setIsAddMeetingModalOpen(false);
  };

// Function to handle status change
const handleStatusChange = async (e) => {
  const newStatus = e.target.value;
  setSelectedStatus(newStatus);

  try {
    // Sending request to change project status
    const response = await axios.put(
      `http://localhost:8008/api/change-project-status/${project._id}`, 
      { status: newStatus }
    );

    if (response.status === 200) {
      console.log('Status updated successfully');
      fetchProjects(user?._id)
      // You can also add logic here to display success message to the user
    } else {
      console.error('Failed to update status');
      // Show a generic error message to the user
      alert('Failed to update status. Please try again.');
    }
  } catch (error) {
    // Handle error based on the response or error message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;

      if (status === 400) {
        // Handle bad request, possibly due to validation error
        alert(`Validation Error: ${data.message}`);
      } else if (status === 404) {
        // Handle project not found error
        alert(`Error: Project not found`);
      } else if (status === 500) {
        // Handle internal server error
        alert(`Server Error: ${data.message}`);
      } else {
        // Handle any other errors
        alert(`Error: ${data.message || 'An unexpected error occurred'}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      alert('No response from the server. Please try again later.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
      alert(`Error: ${error.message}`);
    }
  }
};

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center w-full">
      {/* navbar */}
      <div className="pt-5 w-full px-10 flex justify-between items-center ">
        <div>
          <HeadingBlue25px children="View Project Details" />
        </div>
      </div>
      {/* body */}
      <div className="flex-grow px-10 w-full">
        {/* project status change button */}
        <div className="flex justify-end py-5">
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border rounded-lg text-white font-semibold px-4  py-2 bg-custom-teal outline-none"
          >
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Complete">Complete</option>
            <option value="Inactive">Inactive</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        {/*  general information  div*/}
        <div className="bg-white shadow-[0px_0px_12px_#00000029] rounded-xl p-5 w-full">
          <div className="flex justify-between items-center">
          <div className="flex justify-start items-center gap-5">
            <HeadingLg children="Project Name" />
            <ParagraphBlue2 children={project?.name} />
          </div>
          <div>
            <button className="cursor-pointer">Edit</button>
          </div>
          </div>
          <div className="flex justify-start items-center gap-5">
            <HeadingLg children="Description" />
            <ParagraphBlue2 children={project?.description} />
          </div>
          <div className="flex justify-start items-center gap-5">
            <HeadingLg children="Opened On" />
            <ParagraphBlue2 children={project?.startDate} />
          </div>
          <div className="flex justify-start items-center gap-5">
            <HeadingLg children="Expires In" />
            <ParagraphBlue2 children={project?.endDate} />
          </div>
          <div className="flex justify-start items-center gap-5">
            <HeadingLg children="Passcode" />
            <ParagraphBlue2 children={project?.projectPasscode} />
          </div>
          <div className="flex justify-start items-center gap-5">
            <HeadingLg children="Project Status" />
            <ParagraphBlue2 children={project?.status} />
          </div>
        </div>

        {/* participants, observers, breakout rooms and pools div container */}
        <div className="bg-white shadow-[0px_0px_12px_#00000029] rounded-xl p-5 mt-3 mb-10">
          {/* tab navigation */}
          <div className="flex justify-around space-x-10  border-b">
            <button
              className={`py-2 border-custom-dark-blue-1 ${
                activeTab === "Meetings" ? "border-b-2 " : "opacity-25"
              }`}
              onClick={() => handleTabChange("Meetings")}
            >
              Meetings
            </button>
            <button
              className={`py-2 border-custom-dark-blue-1 ${
                activeTab === "Members" ? "border-b-2 " : "opacity-25"
              }`}
              onClick={() => handleTabChange("Members")}
            >
              Members
            </button>
            <button
              className={`py-2 border-custom-dark-blue-1 ${
                activeTab === "Pools" ? "border-b-2 " : "opacity-25"
              }`}
              onClick={() => handleTabChange("Pools")}
            >
              Pools
            </button>
            <button
              className={`py-2 border-custom-dark-blue-1 ${
                activeTab === "Repository" ? "border-b-2 " : "opacity-25"
              }`}
              onClick={() => handleTabChange("Repository")}
            >
              Repository
            </button>
          </div>

          {/* tab content */}
          {activeTab === "Meetings" && (
            <div className="pt-5">
              <div className="flex justify-between items-center">
                <HeadingLg children="Meetings" />
                <Button
                  children="Add Meeting"
                  className="px-4 py-2 rounded-xl"
                  type="submit"
                  onClick={handleAddMeetingModal}
                />
              </div>
              <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[300px] overflow-y-scroll mt-2">
                <MeetingTab meetings={meetings} />
              </div>
            </div>
          )}

          {activeTab === "Members" && (
            <div className="pt-5">
              <HeadingLg children="Observers List" />
              <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[300px] overflow-y-scroll mt-2">
                {/* table heading */}
                <div className="flex justify-start items-center py-3 px-5 shadow-sm">
                  <div className="w-[30%]">
                    <HeadingLg children="Name" />
                  </div>
                  <div className="w-[70%]">
                    <HeadingLg children="Email" />
                  </div>
                </div>
                {/* table item */}
                {/* {formData.participants.map((participant, index) => ( */}
                <div className="flex justify-start items-center py-3 px-5 shadow-sm">
                  <div className="w-[30%]">
                    <ParagraphLg children="Juliet Frazier" />
                    {/* <ParagraphLg children={participant.name} /> */}
                  </div>
                  <div className="w-[70%]">
                    <ParagraphLg children="JulietFrazier123@gmail.com" />
                    {/* <ParagraphLg children={participant.email} /> */}
                  </div>
                </div>
                <div className="flex justify-start items-center py-3 px-5 shadow-sm">
                  <div className="w-[30%]">
                    <ParagraphLg children="Juliet Frazier" />
                    {/* <ParagraphLg children={participant.name} /> */}
                  </div>
                  <div className="w-[70%]">
                    <ParagraphLg children="JulietFrazier123@gmail.com" />
                    {/* <ParagraphLg children={participant.email} /> */}
                  </div>
                </div>
                <div className="flex justify-start items-center py-3 px-5 shadow-sm">
                  <div className="w-[30%]">
                    <ParagraphLg children="Juliet Frazier" />
                    {/* <ParagraphLg children={participant.name} /> */}
                  </div>
                  <div className="w-[70%]">
                    <ParagraphLg children="JulietFrazier123@gmail.com" />
                    {/* <ParagraphLg children={participant.email} /> */}
                  </div>
                </div>
                {/* ))} */}
              </div>
            </div>
          )}

          {activeTab === "Pools" && (
            <div className="pt-5">
              <div className="flex justify-stat items-center px-3">
                <div className="w-[25%]">
                  <HeadingLg children="Name" />
                </div>
                <div className="w-[20%]">
                  <HeadingLg children="Participants" />
                </div>
                <div className="w-[55%]">
                  <HeadingLg children="Interpreter" />
                </div>
              </div>
              {/* {formData.breakoutRooms.map((room, index) => ( */}
              <div className="py-3 space-y-3">
                <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
                  <ParagraphLg className="w-[25%]">Sistine Chapel</ParagraphLg>
                  <ParagraphLg className="w-[20%]">5</ParagraphLg>
                  <ParagraphLg className="w-[50%]">Sara Meyer</ParagraphLg>
                </div>

                <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3 ">
                  <ParagraphLg className="w-[25%]">Sistine Chapel</ParagraphLg>
                  <ParagraphLg className="w-[20%]">5</ParagraphLg>
                  <ParagraphLg className="w-[50%]">Adam Wood</ParagraphLg>
                </div>
              </div>
              {/* ))} */}
            </div>
          )}

          {activeTab === "Repository" && (
            <div className="pt-5">
              <HeadingLg children="You have created 2 polls for this meeting." />
              <div className="flex justify-start items-center px-3 mt-4">
                <div className="w-[25%]">
                  <HeadingLg children="Name" />
                </div>
                <div className="w-[20%]">
                  <HeadingLg children="Total Questions" />
                </div>
                <div className="w-[20%]">
                  <HeadingLg children="Creator" />
                </div>
                <div className="w-[35%]">
                  <HeadingLg children="Status" />
                </div>
              </div>
              {/* {formData.breakoutRooms.map((room, index) => ( */}
              <div className="py-3 space-y-3">
                <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
                  <ParagraphLg className="w-[25%]">
                    Poll 1: Sistine Chapel
                  </ParagraphLg>
                  <ParagraphLg className="w-[20%]">1 Question</ParagraphLg>
                  <ParagraphLg className="w-[20%]">Olivia Hasting</ParagraphLg>
                  <ParagraphLg className="w-[30%]">Active</ParagraphLg>
                </div>
                <div className="flex justify-start items-center bg-white rounded-xl shadow-[0px_0px_6px_#00000029] p-3">
                  <ParagraphLg className="w-[25%]">
                    Poll 1: Sistine Chapel
                  </ParagraphLg>
                  <ParagraphLg className="w-[20%]">1 Question</ParagraphLg>
                  <ParagraphLg className="w-[20%]">Olivia Hasting</ParagraphLg>
                  <ParagraphLg className="w-[30%]">Active</ParagraphLg>
                </div>
              </div>
              {/* ))} */}
            </div>
          )}
          {isAddMeetingModalOpen && (
            <AddMeetingModal
              onClose={closeAddMeetingModal}
              project={project}
              user={user}
              refetchMeetings={fetchMeetings}
            />
          )}
          <div className="flex justify-end py-3">
            <Pagination
              currentPage={2}
              totalPages={5}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
