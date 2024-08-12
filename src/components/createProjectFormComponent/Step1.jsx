"use client";
import React, { useState } from "react";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import InputField from "../shared/InputField";
import Dropdown from "../shared/Dropdown";
import { language, moderatorList, timeZone } from "@/constant/Index";
import FormDropdownLabel from "../shared/FormDropdownLabel";
import Button from "../shared/Button";

const Step1 = ({ formData, setFormData }) => {
  const [selectedModerator, setSelectedModerator] = useState("Moderator1");
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    "UTC-12:00 International Date Line West"
  );
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleModeratorSelect = (status) => {
    setSelectedModerator(status);
    // Add your status select logic here
  };
  const handleTimeZoneSelect = (status) => {
    setSelectedTimeZone(status);
    // Add your status select logic here
  };
  const handleLanguageSelect = (status) => {
    setSelectedLanguage(status);
    // Add your status select logic here
  };

  return (
    <div className="px-5">
      <HeadingBlue25px children="General Information" />
      {/* form items container div */}
      <div className="pt-3 w-full ">
        {/* contianer for name and moderator */}
        <div className="flex justify-start items-start gap-5 w-full flex-col md:flex-row">
          <div className="w-full">
            <InputField
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-full">
            <p className="block text-sm font-semibold mb-2">Moderator | Host</p>
            <Dropdown
              options={moderatorList}
              selectedOption={selectedModerator}
              onSelect={handleModeratorSelect}
              value={formData.host}
              onChange={(e) =>
                setFormData({ ...formData, host: e.target.value })
              }
              className="z-30"
            />
          </div>
        </div>
        {/* container for start time, time zone and duration */}
        <div className="flex justify-start items-start gap-5 w-full mt-5">
          {/* ⁡⁢⁣⁣Todo calender need to implement ⁡ */}
          <div className="flex justify-center items-start gap-5 flex-col md:flex-row">
            <div>
              <p className="block text-sm font-semibold mb-2" htmlFor={name}>
                Start Time
              </p>
              <div className="flex items-center">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full px-4 py-2 border-[0.5px] rounded-lg focus:outline-none border-black"
                />
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className="w-full px-4 py-2 border-[0.5px] rounded-lg focus:outline-none ml-2 border-black"
                />
              </div>
            </div>
            <div>
              <FormDropdownLabel children="Time Zone" className="mb-2 z-50" />
              <Dropdown
                options={timeZone}
                selectedOption={selectedTimeZone}
                onSelect={handleTimeZoneSelect}
                className=" w-full z-20"
                value={formData.timeZone}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            </div>
            {/* <InputField
              label="Duration"
              type="text"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            /> */}
          </div>
        </div>
        <div className="md:w-[45%] w-full">
          <InputField
            label="Description"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        {/* lower div container */}
        <div className="flex justify-center items-center gap-5  flex-col md:flex-row">
          {/* ⁡⁣⁣⁢security div⁡ */}
          <div className="space-y-1 md:w-2/5 w-full">
            <FormDropdownLabel children="Security" />
            {/* passcode and waiting room container */}
            <div className="flex justify-start items-start gap-5 pt-2 flex-col md:flex-row">
              {/* passcode */}
              <div className="md:w-1/2 w-full">
                <div className="flex justify-start items-center gap-2 pb-1">
                  <input
                    type="checkbox"
                    checked={formData.passcodeSelect}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passcodeSelect: e.target.checked,
                      })
                    }
                  />
                  <FormDropdownLabel children="Passcode" />
                </div>
                <div className="flex flex-col justify-center w-full">
                  <InputField
                    value={formData.passcode}
                    onChange={(e) =>
                      setFormData({ ...formData, passcode: e.target.value })
                    }
                    type="text"
                    name="passcode"
                  />
                  <Button
                    type="submit"
                    variant="save"
                    children="New Passcode"
                    className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl mt-2 md:mt-0"
                  />
                  <p className="text-sm text-custom-dark-blue-2 pt-3">
                    Only users who have the invite link or passcode can join the
                    meeting
                  </p>
                </div>
              </div>
              {/* ⁡⁣⁣⁢Waiting room⁡ */}
              <div className="sm:w-1/2 w-full">
                <div className="flex justify-start items-center gap-2 pb-1">
                  <input
                    type="checkbox"
                    checked={formData.waitingRoomSelect}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        waitingRoomSelect: e.target.checked,
                      })
                    }
                  />
                  <FormDropdownLabel children="Waiting Room" />
                </div>

                <p className="text-sm text-custom-dark-blue-2 pt-1">
                  Only users admitted by the host can join the meeting
                </p>
              </div>
            </div>
          </div>
          {/* ⁡⁣⁣⁢advance option div⁡ */}
          <div className="space-y-2 md:w-3/5 w-full">
            <FormDropdownLabel children="Advanced Option" />
            {/* interpreter, language and name div container */}
            <div className="flex justify-start items-start gap-5 pt-2 flex-col md:flex-row">
              {/* interpreter */}
              <div className="w-[20%]">
                <div className="flex justify-start items-center gap-2 ">
                  <input
                    type="checkbox"
                    checked={formData.interpreterSelect}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        interpreterSelect: e.target.checked,
                      })
                    }
                  />
                  <FormDropdownLabel children="Interpreter" />
                </div>
              </div>
              {/* language */}
              <div className="md:w-[30%] w-full">
                <FormDropdownLabel children="Language" className="mb-2" />
                <Dropdown
                  options={language}
                  selectedOption={selectedLanguage}
                  onSelect={handleLanguageSelect}
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                />
              </div>
              {/* name and email */}
              <div className="md:w-[50%] w-full">
                <InputField
                  label="Name"
                  type="text"
                  value={formData.interpreterName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interpreterName: e.target.value,
                    })
                  }
                />
                <InputField
                  label="Email"
                  type="text"
                  value={formData.interpreterEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interpreterEmail: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
