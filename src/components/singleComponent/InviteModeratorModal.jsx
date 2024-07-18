'use client'
import React, { useState } from 'react';
import InputField from '../shared/InputField';
import Button from '../shared/button';


const InviteModeratorModal = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  // function to close error modal
  const handleCloseErrorModal = () => {
    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[420px]">
        <h2 className="text-2xl font-semibold mb-1 text-custom-dark-blue-2">Invite Moderator</h2>
        <p className='text-custom-gray-6 text-[11px] mb-3 '>Invite a new moderator by entering their name and email below.</p>
        <form onSubmit={handleSubmit}>
         <div className='flex justify-center items-center gap-3'>
         <InputField
            label="First Name"
            type='text'
            name="firstName"
       
            onChange={(e) => setFirstName(e.target.value)}
                  
          />
          <InputField
            label="Last Name"
            type='text'
            name="lastName"
           
            onChange={(e) => setFirstName(e.target.value)}
                  
          />
         </div>
          <InputField
            label="Email"
            type='email'
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            
          />
        
          <div className="flex justify-end gap-4 mt-4">
            <Button
              children="Cancel"
              type="button"
              variant='cancel'
              onClick={onClose}
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#031F3A5c] "
            />
            <Button
              children="Save"
              type="submit"
              variant='save'
              onClick={handleSubmit}
              className="rounded-xl text-center py-2 px-5 shadow-[0px_3px_6px_#09828F69] "
            />
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default InviteModeratorModal;
