'use client';
import Button from '@/components/shared/button';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import userImage from '../../../../public/placeholder-image.png';
import InputField from '@/components/shared/InputField';

const page = () => {
  const [user, setuser] = useState({
    firstName: 'Johnny',
    lastName: 'Silver',
    email: 'johonnysilver2@gmail.com',
  });
  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center">
      {/* navabar */}
      <div className="bg-white h-20 w-full">
        {' '}
        <div className="px-10 flex justify-between items-center pt-3">
          {/* left div */}
          <div>
            <p className="text-2xl font-bold text-custom-teal">Edit Profile</p>
          </div>
          {/* right div */}
          <div className="flex justify-center items-center gap-4">
            <Button
              children="Save"
              type="submit"
              variant="secondary"
              icon={<FaSave />}
              className="rounded-xl w-[100px] text-center py-3 shadow-[0px_3px_6px_#2976a54d]"
            />
          </div>
        </div>
      </div>
      {/* body */}
      <div className="flex-grow">
        <div className="pt-8">
          {/* name, role and image */}
          <div className="flex justify-start items-center gap-8">
            <Image
              src={userImage}
              alt="user image"
              height={70}
              width={70}
              className="rounded-full"
            />
            <div className="flex-grow">
              <h1 className="text-3xl font-semibold text-custom-dark-blue-1">
                Johnny Silver
              </h1>
              <p>ADMIN</p>
            </div>
          </div>
          {/* personal details */}
          <div>
            <h1 className="text-2xl font-semibold text-custom-dark-blue-1 pt-7 ">
              Personal Details
            </h1>
            <div className="space-y-7 pt-7 mt-5">
              <InputField
                label="First Name"
                name="firstName"
                value={user.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={user.lastName}
              />
              <InputField label="Email" name="email" value={user.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
