"use client";

import React, { useState } from 'react';
import axios from 'axios';

import Button from "@/components/shared/Button";
import Step1 from "@/components/createProjectFormComponent/Step1";
import Step2 from "@/components/createProjectFormComponent/Step2";
import Step3 from "@/components/createProjectFormComponent/Step3";
import Step4 from "@/components/createProjectFormComponent/Step4";
import Step5 from "@/components/createProjectFormComponent/Step5";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import { PiNotebookFill, PiSquaresFourFill } from "react-icons/pi";
import { FaUserClock, FaUsers } from "react-icons/fa";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { HiOutlineMinus } from "react-icons/hi2";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Sample Project', // Default name
    description: 'This is a sample project description.', // Default description
    startDate: '2024-08-01', // Default start date
    status: 'Open',
    creator: '66ac809894acb82568c588a0', // Default creator ID
    moderator: '66ac809894acb82568c588a0', // Default moderator ID
    startTime: '2024-08-01T10:00', // Default start time
    timeZone: 'UTC-12:00 International Date Line West', // Default time zone
    participants: [
      { name: 'Juliet Frazier', email: 'juliet@gmail.com' },
      { name: 'Harsh Pandey', email: 'harsh123@gmail.com' }
    ],
    observers: [
      { name: 'Juliet Frazier', email: 'juliet@gmail.com' }
    ],
    breakoutRooms: [
      {
        name: 'Breakout Room 1',
        participants: [],
        interpreter: false,
        interpreterName: '',
        interpreterEmail: '',
        interpreterLanguage: 'English'
      }
    ],
    polls: [],
    interpreters: [],
    passcode: 'defaultpasscode', // Default passcode
    endDate: '2024-08-02' // Default end date
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:8008/api/create/project', formData);
      console.log(response)
      alert('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const getIconClass = (step) => {
    return currentStep >= step ? 'bg-custom-orange-1' : 'bg-custom-dark-blue-1';
  };
  
  const getLineClass = (step) => {
    return currentStep >= step ? 'text-custom-orange-1 text-5xl' : 'text-custom-dark-blue-1 text-5xl';
  };


  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen pb-10">
      <div className="bg-white py-5 w-full">
        <div className="md:px-10 flex justify-around md:justify-between items-center w-full">
          <div>
            <p className='text-custom-teal text-2xl font-bold text-center' >New Project</p>
          </div>
        </div>
      </div>
  <div className="create_project_progress_bar_bg py-1 w-full flex justify-center items-center ">
        <div className={`text-white ${getIconClass(1)} p-2 rounded-full`}>
          <PiNotebookFill />
        </div>
        <HiOutlineMinus className={getLineClass(2)} />
        <div className={`text-white ${getIconClass(2)} p-2 rounded-full`}>
          <FaUsers />
        </div>
        <HiOutlineMinus className={getLineClass(3)} />
        <div className={`text-white ${getIconClass(3)} p-2 rounded-full`}>
          <FaUserClock />
        </div>
        <HiOutlineMinus className={getLineClass(4)} />
        <div className={`text-white ${getIconClass(4)} p-2 rounded-full`}>
          <PiSquaresFourFill />
        </div>
        <HiOutlineMinus className={getLineClass(5)} />
        <div className={`text-white ${getIconClass(5)} p-2 rounded-full`}>
          <BiSolidBarChartAlt2 />
        </div>
      </div>
      <div className="flex-grow mx-auto pt-5 md:px-10 ">
        {renderStep()}

        {/* Navigation buttons */}
        <div className="flex justify-end gap-3 mt-2">
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              variant="cancel"
              className="rounded-lg px-7 py-1"
            >
              Back
            </Button>
          )}
          {currentStep < 5 && (
            <Button
              onClick={nextStep}
              variant="save"
              className="rounded-lg px-7 py-1"
            >
              Next
            </Button>
          )}
          {currentStep === 5 && (
            <Button
              variant="save"
              type="button"
              className="rounded-lg px-7 py-1"
              onClick={handleSubmit}
            >
              Save Project
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
