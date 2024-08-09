'use client';
import React, { useState } from 'react';
import HeadingBlue25px from '../shared/HeadingBlue25px';
import InputField from '../shared/InputField';
import Dropdown from '../shared/Dropdown';
import { language, moderatorList, timeZone } from '@/constant/Index';
import FormDropdownLabel from '../shared/FormDropdownLabel';
import Button from '../shared/button';

const Step1 = ({ formData, setFormData }) => {
  const [selectedModerator, setSelectedModerator] = useState('Moderator1');
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    'UTC-12:00 International Date Line West'
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    'English'
  );

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
    <div>
      <HeadingBlue25px children="General Information" />
      {/* form items container div */}
      <div className="pt-3 w-full ">
        {/* contianer for name and moderator */}
        <div className="flex justify-start items-start gap-5 w-full">
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
            />
          </div>
        </div>
        {/* container for start time, time zone and duration */}
        <div className="flex justify-start items-start gap-5 w-full">
          {/* ⁡⁢⁣⁣Todo calander need to implement ⁡ */}
          <div className="flex justify-center items-start gap-5">
            <input
              type="datetime-local"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
            <div>
              <FormDropdownLabel children="Time Zone"
              className='mb-2 z-50'
              />
              <Dropdown
                options={timeZone}
                selectedOption={selectedTimeZone}
                onSelect={handleTimeZoneSelect}
                className=" w-full "
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
        <div className='w-1/3'>
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
        <div className="flex justify-center items-center gap-5  ">
          {/* ⁡⁣⁣⁢security div⁡ */}
          <div className="space-y-1 w-2/5">
            <FormDropdownLabel children="Security" />
            {/* passcode and waiting room container */}
            <div className="flex justify-start items-start gap-5 pt-2">
              {/* passcode */}
              <div className="w-1/2">
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
                    className="py-1 px-5 shadow-[0px_3px_6px_#09828F69] rounded-xl"
                  />
                  <p className="text-sm text-custom-dark-blue-2 pt-3">
                    Only users who have the invite link or passcode can join the
                    meeting
                  </p>
                </div>
              </div>
              {/* ⁡⁣⁣⁢Waiting room⁡ */}
              <div className="w-1/2">
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
          <div className="space-y-2 w-3/5 ">
            <FormDropdownLabel children="Advanced Option" />
            {/* interpreter, language and name div container */}
            <div className='flex justify-start items-start gap-5 pt-2'>
              {/* interpreter */}
              <div className='w-[20%]'>
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
              <div className='w-[30%]'>
                <FormDropdownLabel children='Language'
                className='mb-2'/>
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
              <div className='w-[50%]'>
              <InputField
          label="Name"
          type="text"
          value={formData.interpreterName}
          onChange={(e) =>
            setFormData({ ...formData, interpreterName: e.target.value })
          }
        />
        <InputField
          label="Email"
          type="text"
          value={formData.interpreterEmail}
          onChange={(e) =>
            setFormData({ ...formData, interpreterEmail: e.target.value })
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
