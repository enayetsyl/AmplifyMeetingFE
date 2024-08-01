'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaSave } from 'react-icons/fa';
import Button from '@/components/shared/button';
import InputField from '@/components/shared/InputField';
import userImage from '../../../../../public/placeholder-image.png';

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/users/find-by-id', {
          params: { id },
        });
        setUser(response.data.result);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally redirect to registration page if user not found
        if (error.response && error.response.status === 404) {
          // router.push('/register');
        }
      }
    };

    fetchUserData();
  }, [id, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8008/api/users/update', user);
      alert('Profile updated successfully');
      // Optionally redirect or refresh the page
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="my_profile_main_section_shadow bg-[#fafafb] bg-opacity-90 h-full min-h-screen flex flex-col justify-center items-center">
      {/* navbar */}
      <div className="bg-white h-20 w-full">
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
              onClick={handleSave}
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
                {user.firstName} {user.lastName}
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
                onChange={handleInputChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
              />
              <InputField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
