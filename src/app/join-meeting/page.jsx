"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Logo from "@/components/shared/Logo";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/button";
import joinMeetingImage from "../../../public/join-meeting.png";
import Footer from "@/components/shared/Footer";

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "default@Password123", // you can use a hidden input for this if needed
    role: "Participant", // or any default role
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/create`,
        formData
      );
      if (response.status === 200) {
        alert("login succesful");
        router.push("/upload-photo");
      }
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <div
        className="bg-white lg:flex lg:justify-center lg:items-center"
     
      >
        {/* left div */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-10">
          <div className="pt-5">
            <Logo />
          </div>
          <h1 className="text-3xl text-custom-dark-blue-2 font-bold uppercase lg:py-10 py-8">
            Join Meeting
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-5 w-full"
          >
            <div className="lg:flex lg:justify-start lg:items-center lg:gap-5 w-full">
              <InputField
                label="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full ">
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full  lg:pt-2">
              <Button
                children="Join Meeting"
                type="submit"
                variant="primary"
                className="w-full py-2 rounded-xl mb-10 lg:mb-0"
              />
            </div>
          </form>
        </div>
        {/* right div */}
        <div className="lg:w-[60%] hidden lg:flex justify-center">
          <Image
            src={joinMeetingImage}
            alt="join meeting image"
            height={300}
            width={500}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
