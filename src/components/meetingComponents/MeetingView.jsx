import React from "react";
import Logo from "../shared/Logo";
import { FaHeadphones, FaUserFriends, FaVideo, FaVideoSlash } from "react-icons/fa";
import Button from "../shared/button";
import HeadingBlue25px from "../shared/HeadingBlue25px";
import { IoCaretDownSharp, IoLogOutSharp } from "react-icons/io5";
import Image from "next/image";
import meetingImage from "../../../public/meeting.jpeg";
import { MdCallEnd, MdScreenShare, MdVerifiedUser } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { PiLineVerticalBold } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosMicOff } from "react-icons/io";
import WhiteBoard from "./WhiteBoard";

const MeetingView = ({ role, users, isWhiteBoardOpen, setIsWhiteBoardOpen }) => {
  return (
    <div className="px-5 py-5 flex flex-col justify-between items-between h-full">

      {/* First ------ nav bar */}
      <div className="flex justify-between items-center pb-2">
        {/* participant name */}
        <div className="flex justify-start items-center space-x-2 pb-2">
          <FaVideo />
          <p className=" text-custom-gray-3 font-semibold">On going meeting</p>
          <Button
            children={`${role} View`}
            type="button"
            variant={`${role !== 'Moderator' ? 'secondary' : 'primary'}`}
            className={`text-white py-1 px-3 rounded-xl text-sm`}
          />
        </div>
        {/* logo */}
        <Logo />
      </div>

      {/* Second ---------- name bar */}
      <div className="flex justify-between items-center pb-4">
        <HeadingBlue25px children="MEETING 01 - PROJECT NAME" />
        <Button
          children="Leave"
          type="submit"
          variant="meeting"
          icon={<IoLogOutSharp />}
          className=" rounded-lg text-custom-black px-3 py-1"
        />
      </div>

      {/*Third ---------- meeting stream */}
      {
        isWhiteBoardOpen ? (
         <div className="flex-1">
 <WhiteBoard
          role={role}
          users={users}
          />

         </div>
        ) : (
          <div className="pt-2 bg-black flex-1 rounded-xl flex flex-col justify-center items-center">
        {/* top bar */}
        <div className="px-10 flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-3">
          <MdVerifiedUser className="bg-[#111111] rounded-lg p-0.5 text-[#69D569]" />
          <p className="text-white">Original Sound: Off</p>
          <IoCaretDownSharp className="text-white" />
          </div>
          <div className="bg-[#242424] flex justify-between items-center gap-2 p-1 rounded-lg">
          <CgMenuGridR className="text-white"/>
          <p className="text-white text-sm">View</p>
          </div>
        </div>
        {/* video stream */}
        <div className="flex-1 py-5 px-10 flex justify-center items-center ">
         <div className="grid grid-cols-4 gap-3">
         {
            users && users.map(user => 
             <div className="relative">
               <Image
              src={user.image}
              alt="participant image"
              height={120}
              width={150}
              className=""
              />
              <div className="absolute bottom-0 left-0 bg-black flex justify-center items-center gap-1 px-1.5 py-0.5">
              {
                user.isSilent ?  (
                  <IoIosMicOff className="text-custom-red text-[10px]"/>
                ) : ""
              }
                <p className="text-white text-[8px]">{user.name}</p>
              </div>
             </div>
            )
          }
         </div>
        </div>
        {/* control bar */}
        <div className="bg-[#1b1b1b] py-2 flex justify-center items-center gap-4 w-full rounded-b-xl">
          <FaHeadphones className="text-custom-gray-2"/>
          <FaVideoSlash className="text-custom-gray-2"/>
          <MdScreenShare className="text-[#2CD95F]"/>
          <FaUserFriends className="text-custom-gray-2" />
          <BsThreeDots className="text-custom-gray-2"/>
          <PiLineVerticalBold  className="text-custom-gray-2"/>
          <MdCallEnd className="text-[#CD3B33]"/>
        </div>
      </div>
        )
      }
    </div>
  );
};

export default MeetingView;
