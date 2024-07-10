"use client";
import InputField from "@/components/shared/InputField";
import Image from "next/image";
import React, { useState } from "react";
import registerImage from "../../../../public/register.jpg";
import logo from "../../../../public/logo.jpg";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
    <div>
      {/* Top div for lg*/}
      <div className="hidden justify-center items-start lg:flex bg-white h-20">
        {/* left image div */}
        <div className="flex-1 flex items-center w-full h-full pl-10">
      <Image
      src={logo}
      alt="logo"
      height={120}
      width={180}
      />
        </div>
        <div className="flex-1 bg-custom-gray-3 h-20"></div>
      </div>
      {/* Top div for mobile */}
      <div className="lg:hidden bg-white flex justify-center items-center pt-10">
      <Image
      src={logo}
      alt="logo"
      height={120}
      width={180}
      />

      </div>
    </div>
    // <div className="min-h-screen flex flex-col justify-center items-center lg:flex-row bg-gray-100">
    //   <div className="flex-1 w-full h-full  bg-white p-8 ">
    //     <div className='h-[90vh]'>
    //     <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
    //     <form onSubmit={handleSubmit}>
    //       <InputField
    //         label="First Name"
    //         name="firstName"
    //         value={formData.firstName}
    //         onChange={handleChange}
    //         placeholder="Enter your first name"
    //         error={errors.firstName}
    //       />
    //       <InputField
    //         label="Last Name"
    //         name="lastName"
    //         value={formData.lastName}
    //         onChange={handleChange}
    //         placeholder="Enter your last name"
    //         error={errors.lastName}
    //       />
    //       <InputField
    //         label="Email"
    //         type="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         placeholder="Enter your email"
    //         error={errors.email}
    //       />
    //       <InputField
    //         label="Password"
    //         type={showPassword ? 'text' : 'password'}
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         placeholder="Enter your password"
    //         error={errors.password}
    //         icon={
    //           <button
    //             type="button"
    //             onClick={() => setShowPassword(!showPassword)}
    //             className="focus:outline-none"
    //           >
    //             {showPassword ? <FaEyeSlash /> : <FaEye />}
    //           </button>
    //         }
    //       />
    //       <InputField
    //         label="Confirm Password"
    //         type={showPassword ? 'text' : 'password'}
    //         name="confirmPassword"
    //         value={formData.confirmPassword}
    //         onChange={handleChange}
    //         placeholder="Confirm your password"
    //         error={errors.confirmPassword}
    //         icon={
    //           <button
    //             type="button"
    //             onClick={() => setShowPassword(!showPassword)}
    //             className="focus:outline-none"
    //           >
    //             {showPassword ? <FaEyeSlash /> : <FaEye />}
    //           </button>
    //         }
    //       />
    //       <div className="mb-4">
    //         <label className="inline-flex items-center">
    //           <input
    //             type="checkbox"
    //             className="form-checkbox"
    //             name="terms"
    //             // Handle checkbox change
    //           />
    //           <span className="ml-2">
    //             I agree to the <a href="#" className="text-blue-600">Terms & Conditions</a>
    //           </span>
    //         </label>
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600"
    //       >
    //         Create Account
    //       </button>
    //     </form>
    //     <p className="mt-4 text-center">
    //       Already have an account? <a href="#" className="text-blue-600">Login</a>
    //     </p>
    //     </div>
    //   </div>
    //   <div className="relative w-full h-full flex-1 flex">
    //   <Image
    //         src={registerImage}
    //         alt="Amplify register"
    //          />
    //     </div>

    // </div>
  );
};

export default Register;
