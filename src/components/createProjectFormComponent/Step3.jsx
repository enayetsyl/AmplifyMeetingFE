import React, { useState, useEffect } from "react";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import InputField from "../shared/InputField";
import { FaCircle } from "react-icons/fa";
import FormDropdownLabel from "../shared/FormDropdownLabel";
import Dropdown from "../shared/Dropdown";
import { timeZone } from "@/constant/Index";
import { generatePasscode } from "@/utils/generatePasscode"; // Adjust the import path as needed

const Step3 = ({ formData, setFormData, contacts }) => {
  const [selectedTimeZone, setSelectedTimeZone] = useState(formData.timeZone || "UTC-12:00 International Date Line West");

  // Function to refresh the passcode
  const refreshPasscode = () => {
    const newPasscode = generatePasscode();
    setFormData((prevFormData) => ({
      ...prevFormData,
      meetingPasscode: newPasscode,
    }));
  };

  // Automatically generate passcode when the component mounts or when the start date changes
  useEffect(() => {
    if (!formData.meetingPasscode) {
      refreshPasscode();
    }
  }, [formData.startDate]);

  // Update formData when time zone is selected
  const handleTimeZoneSelect = (selectedTimeZone) => {
    setSelectedTimeZone(selectedTimeZone);
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeZone: selectedTimeZone,
    }));
  };

  // Update formData for other input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="px-5 md:px-0">
      <HeadingBlue25px>Add Meeting</HeadingBlue25px>
      <div className="px-5 md:px-0 pt-10">
        <div className="flex justify-start items-center gap-5">
          <InputField
            label="Title"
            name="meetingTitle"
            value={formData.meetingTitle}
            onChange={handleInputChange}
            placeholder="Meeting Title"
          />
          <div className="mb-1">
            <label
              htmlFor="meetingModerator"
              className="block sm:text-sm font-semibold mb-2 text-sm text-black"
            >
              Moderator
            </label>
            <select
              name="meetingModerator"
              id="meetingModerator"
              value={formData.meetingModerator}
              onChange={handleInputChange}
              className="px-4 py-1 sm:py-2 border border-[#000000] rounded-lg flex items-center justify-between w-full text-custom-dark-blue-1 z-50"
            >
              <option value="">Select Moderator</option>
              {contacts.map((contact, index) => (
                <option key={index} value={contact.firstName}>
                  {contact.firstName} {contact.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <InputField
          label="Description"
          placeholder="Write Description"
          className="w-full"
          name="meetingDescription"
          type="text"
          value={formData.meetingDescription}
          onChange={handleInputChange}
        />
        <div>
          <div className="flex justify-start items-start gap-5 flex-col md:flex-row">
            <div>
              <p className="block text-sm font-semibold mb-2">Start Time</p>
              <div className="flex items-center">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-[0.5px] rounded-lg focus:outline-none border-black"
                />
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-[0.5px] rounded-lg focus:outline-none ml-2 border-black"
                />
              </div>
            </div>
            <div>
              <FormDropdownLabel className="mb-2 z-50">Time Zone</FormDropdownLabel>
              <Dropdown
                options={timeZone}
                selectedOption={selectedTimeZone}
                onSelect={handleTimeZoneSelect}
                className="w-full z-20"
              />
            </div>
          </div>
          <div className="flex justify-start items-end gap-10 mt-5">
            <InputField
              label="Duration"
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full"
            />
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                name="ongoing"
                checked={formData.ongoing}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="ongoing" className="text-sm font-semibold">
                Ongoing/TBD
              </label>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                name="enableBreakoutRoom"
                checked={formData.enableBreakoutRoom}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="enableBreakoutRoom" className="text-sm font-semibold">
                Breakout Room
              </label>
            </div>
          </div>
          <div className="flex justify-start items-end gap-5 mt-5">
            <InputField
              label="Passcode"
              name="meetingPasscode"
              type="text"
              value={formData.meetingPasscode}
              onChange={handleInputChange}
              className="w-full"
            />
            <div
              className="flex justify-start items-center gap-2 cursor-pointer"
              onClick={refreshPasscode}
            >
              <FaCircle />
              <p>Refresh</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
