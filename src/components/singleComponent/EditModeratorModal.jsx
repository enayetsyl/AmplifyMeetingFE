'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import userImage from '../../../public/user.jpg'; // replace with the path to the user's image
import { RxCrossCircled } from 'react-icons/rx';
import HeadingLg from '../shared/HeadingLg';
import { FaCheckCircle } from 'react-icons/fa';
import ParagraphLg from '../shared/ParagraphLg';
import Button from '../shared/button';
import InputField from '../shared/InputField';

const EditModeratorModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    onSave(updatedUser);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 max-w-2xl ">
        <div className="flex justify-center items-center gap-4 my-6 bg-custom-gray-4">
          <Image
            src={userImage}
            alt="User Image"
            width={80}
            height={80}
            className="rounded-full border-4 border-white border-solid"
          />
          <div className="">
            <HeadingLg children={`${formData.firstName} ${formData.lastName}`} />
            <p className="text-[#787878] text-[12px] font-normal">Moderator</p>
            <div>
              <div className='flex justify-start items-center gap-5'>
                <div className='flex justify-start items-center gap-2'>
                  <input
                    type="checkbox"
                    checked={formData.status === 'Active'}
                    onChange={() => setFormData({ ...formData, status: 'Active' })}
                    className='rounded-xl'
                  />
                  <p className={`text-sm text-custom-dark-blue-2 font-semibold`}>Active</p>
                </div>
                <div className='flex justify-start items-center gap-2'>
                  <input
                    type="checkbox"
                    checked={formData.status === 'Inactive'}
                    onChange={() => setFormData({ ...formData, status: 'Inactive' })}
                    className='rounded-xl'
                  />
                  <p className={`text-sm text-custom-dark-blue-2 font-semibold`}>Inactive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 mx-10">
          <h3 className="text-2xl text-custom-dark-blue-2 font-semibold">
            Personal Details
          </h3>
          <div className="mt-2 space-y-2">
            <div className="flex justify-start items-center gap-5">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                type="text"
                onChange={handleInputChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <HeadingLg children="Email" />
              <ParagraphLg children={formData.email} />
            </div>
            <div>
              <HeadingLg children="Joined On" />
              <ParagraphLg children={user.joinedOn} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 pb-8">
          <Button
            onClick={onClose}
            variant="cancel"
            type="submit"
            children="Cancel"
            className="px-5 py-1 rounded-xl w-20"
          />
          <Button
            onClick={handleSave}
            variant="save"
            type="submit"
            children="Save"
            className="px-5 py-1 rounded-xl w-20"
          />
        </div>
      </div>
    </div>
  );
};

export default EditModeratorModal;
