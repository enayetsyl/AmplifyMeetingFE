import React, { useState, useEffect } from "react";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import InputField from "../shared/InputField";
import { GoPlus } from "react-icons/go";
import Button from "../shared/button";
import HeadingLg from "../shared/HeadingLg";
import { IoTrashSharp } from "react-icons/io5";
import ParagraphLg from "../shared/ParagraphLg";
import Pagination from "../shared/Pagination";

const Step2 = ({ formData, setFormData }) => {
  const [newParticipant, setNewParticipant] = useState({ name: "", email: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const addParticipant = () => {
    setFormData({
      ...formData,
      participants: [...formData.participants, newParticipant],
    });
    setNewParticipant({ name: "", email: "" });
  };

  const updateNewParticipant = (field, value) => {
    setNewParticipant({ ...newParticipant, [field]: value });
  };

  const removeParticipant = (index) => {
    const updatedParticipants = formData.participants.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, participants: updatedParticipants });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the number of pages
  const totalPages = Math.ceil(formData.participants.length / itemsPerPage);

  // Get the participants for the current page
  const currentParticipants = formData.participants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-5 md:px-0">
      <p className="text-custom-teal text-2xl font-bold text-center">Participants</p>
      {/* Form container div */}
      <div className="pt-5 w-full space-y-3">
        <div className="w-full">
          <div className="flex justify-start items-center gap-5 w-full flex-col md:flex-row">
            <div className="w-full">
              <InputField
                label="Name"
                type="text"
                value={newParticipant.name}
                onChange={(e) => updateNewParticipant("name", e.target.value)}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Email"
                type="email"
                value={newParticipant.email}
                onChange={(e) => updateNewParticipant("email", e.target.value)}
              />
            </div>
          </div>
          <div className="flex md:justify-end justify-center">
            <Button
              type="submit"
              variant="save"
              children="Add New"
              className="md:py-1 py-2 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl mt-2 md:mt-0"
              onClick={addParticipant}
              icon={<GoPlus />}
            />
          </div>
        </div>  
      </div>
      {/* participant list div */}
      <div className="pt-3">
        <HeadingLg children="Participant List" />
        <div className="border-[0.5px] border-solid border-custom-dark-blue-1 rounded-xl h-[300px] overflow-y-scroll mt-2">
          {/* table heading */}
          <div className="flex justify-start items-center py-3 px-5 shadow-sm">
            <div className="md:w-[30%] w-1/2">
              <HeadingLg children="Name" />
            </div>
            <div className="md:w-[70%] w-1/2">
              <HeadingLg children="Email" />
            </div>
          </div>
          {/* table item */}
          {currentParticipants.map((participant, index) => (
            <div
              className="flex justify-start items-center py-3 px-5 shadow-sm"
              key={index}
            >
              <div className="md:w-[30%] w-1/2">
                <ParagraphLg children={participant.name} />
              </div>
              <div className="md:w-[65%] w-1/2">
                <ParagraphLg children={participant.email} />
              </div>
              <div className="w-[15%] flex justify-end">
                <IoTrashSharp
                  className="bg-custom-orange-1 text-white p-2 text-3xl rounded-xl cursor-pointer"
                  onClick={() => removeParticipant(index)}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-end py-2">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
