'use client';
import React, { useState } from 'react';

import Button from '@/components/shared/button';
import Step1 from '@/components/createProjectFormComponent/Step1';
import Step2 from '@/components/createProjectFormComponent/Step2';
import Step3 from '@/components/createProjectFormComponent/Step3';
import Step4 from '@/components/createProjectFormComponent/Step4';
import Step5 from '@/components/createProjectFormComponent/Step5';
import HeadingBlue25px from '@/components/shared/HeadingBlue25px';

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    startTime: '',
    duration: '',
    description: '',
    passcodeSelect: false,
    passcode: '',
    waitingRoomSelect: false,
    language: 'English',
    interpreterSelect: false,
    interpreterName: '',
    interpreterEmail: '',

    waitingRoom: false,
    interpreter: false,
    participants: [{name:'Juliet Frazier', email: 'juliet@gmail.com'}, {name:'Juliet Frazier', email: 'juliet@gmail.com'}],
    observers: [{name:'Juliet Frazier', email: 'juliet@gmail.com'}, {name:'Juliet Frazier', email: 'juliet@gmail.com'}],
    breakoutRooms: [],
    polls: [],
  });

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen">
      <div className="bg-white py-5 w-full">
        <div className="px-10 flex justify-between items-center">
          <div>
            <HeadingBlue25px children="New Project" />
          </div>
        </div>
      </div>
      <div className="flex-grow mx-auto pt-5 px-10">
        {renderStep()}

        {/* Next button */}
        <div className="flex justify-end gap-3 mt-2">
          {currentStep > 1 && <Button onClick={prevStep}
          variant="cancel"
              className="rounded-lg px-7 py-1 "
          >Back</Button>}
          {currentStep < 5 && (
            <Button
              onClick={nextStep}
              variant="save"
              className="rounded-lg px-7 py-1 "
            >
              Next
            </Button>
          )}
          {currentStep === 5 && (
            <Button 
            variant='save'
            type='submit'
            className='rounded-lg px-7 py-1'
            onClick={() => alert('Submit Form')}>Save Project</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
