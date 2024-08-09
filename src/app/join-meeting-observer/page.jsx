"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/components/shared/Logo";
import InputField from "@/components/shared/InputField";
import Button from "@/components/shared/button";
import joinMeetingImage from "../../../public/join-meeting-edited.png";
import Footer from "@/components/shared/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    passcode: "",
  });
  const [showPasscode, setShowPasscode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form and handle submission
  };

  return (
    <div className="2xl:min-h-screen">
      <div className="bg-white flex justify-center items-center pl-20 min-h-screen">
        {/* style={{ height: 'calc(100vh - 80px)' }} */}
        {/* left div */}
        <div className="w-[40%] flex flex-col justify-center items-center">
          <div className="">
            <Logo />
          </div>
          <h1 className="text-3xl text-custom-dark-blue-2 font-bold uppercase lg:py-8 xl:py-10 2xl:py-14">
            Join Meeting
          </h1>
          <div className="flex justify-between items-center gap-5 w-full 2xl:px-28">
            <InputField label="First Name" name="firstName" type="text" />
            <InputField label="Last Name" name="lastName" type="text" />
          </div>
          <div className="w-full 2xl:px-28">
            <InputField label="Email" name="email" type="email" />
          </div>
          <div className="w-full 2xl:px-28">
            <InputField
              label="Passcode"
              name="passcode"
              type={showPasscode ? "text" : "password"}
              value={formData.passcode}
              onChange={handleChange}
              icon={
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="focus:outline-none"
                >
                  {showPasscode ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
            />
          </div>
          <div className="w-full 2xl:px-28 pt-2">
            <Button
              children="Join Meeting"
              type="submit"
              variant="primary"
              className="w-full py-2 rounded-xl"
            />
          </div>
        </div>
        {/* right div */}
        <div className="w-[60%] flex justify-center items-center ">
          <Image
            src={joinMeetingImage}
            alt="join meeting image"
            height={500}
            width={700}
            className='lg:pt-40'
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
