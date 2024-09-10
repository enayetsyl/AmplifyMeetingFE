"use client";

import ParticipantLeftSideBar from "@/components/participantWaitingRoom/ParticipantLeftSideBar";
import Button from "@/components/shared/button";
import HeadingBlue25px from "@/components/shared/HeadingBlue25px";
import Logo from "@/components/shared/Logo";
import { FaVideo } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

const page = () => {
  return (
    <div className="flex justify-between min-h-screen max-h-screen meeting_bg">
      {/* Left Sidebar */}
      <div className="h-full">
        <ParticipantLeftSideBar />
      </div>
      {/* Main content */}
      <div className="flex-1 w-full max-h-[100vh] overflow-hidden mb-5">
        <div className="px-5 py-5 flex flex-col justify-between items-between h-full">
          <div className="h-1/5">
            {/* First ------ nav bar */}
            <div className="flex justify-between items-center pb-2">
              {/* participant name */}
              <div className="flex justify-start items-center space-x-2 pb-2">
                <FaVideo />
                <p className=" text-custom-gray-3 font-semibold">
                  Waiting Room
                </p>

                <Button
                  children={`Participant View`}
                  type="button"
                  variant={"primary"}
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
          </div>

          {/*Third ---------- meeting stream */}
          <div className="flex items-center justify-center w-full min-h-screen bg-white rounded-lg">
            <h1 className="text-2xl font-bold">
              Please wait, the meeting host will let you in soon.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
