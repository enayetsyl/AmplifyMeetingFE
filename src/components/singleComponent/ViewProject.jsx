"use client";
import Button from "@/components/shared/Button";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import HeadingLg from "@/components/shared/HeadingLg";
import Pagination from "@/components/shared/Pagination";
import ParagraphLg from "@/components/shared/ParagraphLg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import ParagraphBlue2 from "../shared/ParagraphBlue2";

const ViewProject = ({ project }) => {
  console.log("inside view project", project);

  const [activeTab, setActiveTab] = useState("Participants");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = () => {
    //Add logic here
  };

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center ">
      {/* navbar */}
      <div className="bg-white h-24 w-full px-10 flex justify-between items-center ">
        <div>
          <HeadingBlue25px children="View Project Details" />
        </div>
      </div>
      {/* body */}
      <div className="flex-grow px-10 w-full">
        {/* button */}
        <div className="flex justify-end py-5">
          <Link href="/dashboard/edit-project">
            <Button
              children="Edit"
              type="submit"
              variant="save"
              icon={<RiPencilFill />}
              className="rounded-xl  px-5 py-1 shadow-[0px_3px_6px_#2976a54d]"
            />
          </Link>
        </div>
        {/*  general information  div*/}
        <div className="bg-white shadow-[0px_0px_12px_#00000029] rounded-xl p-5">
          <div className="flex justify-start items-center gap-5">
            <HeadingLg children="Project Name" />
            <ParagraphBlue2 children={project?.projectName} />
          </div>
          <div className="flex justify-start items-center gap-5">
            <HeadingLg children="Description" />
            <ParagraphBlue2 children={project?.projectDescription} />
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
              <HeadingLg children="Participant List" />
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
                {/* ))} */}
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
