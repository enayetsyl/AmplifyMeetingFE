import React from "react";
import Logo from "../shared/Logo";
import {
  FaHeadphones,
  FaUserFriends,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import Button from "../shared/Button";
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
import OngoingMeeting from "./OngoingMeeting";
import EndOFMeeting from "./EndOFMeeting";

const MeetingView = ({
  role,
  users,
  isWhiteBoardOpen,
  setIsWhiteBoardOpen,
  meetingStatus,
  isRecordingOpen,
  setIsRecordingOpen,
  isBreakoutRoom,
  setIsBreakoutRoom,
  breakoutRooms,
  setBreakoutRooms,
  projectStatus
}) => {
  return (
    <div className="px-5 py-5 flex flex-col justify-between items-between h-full">
      <div className="h-1/5">
        {/* First ------ nav bar */}
        <div className="flex justify-between items-center pb-2">
          {/* participant name */}
          <div className="flex justify-start items-center space-x-2 pb-2">
            <FaVideo />
            <p className=" text-custom-gray-3 font-semibold">
              {meetingStatus == "Ongoing"
                ? "On going Meeting"
                : "End of Meeting"}
            </p>
            <Button
              children={`${projectStatus}`}
              type="button"
              variant={`${projectStatus !== "Open" ? "secondary" : "primary"}`}
              className={`text-white py-1 px-3 rounded-xl text-sm`}
            />
            <Button
              children={`${role} View`}
              type="button"
              variant={`${role !== "Moderator" ? "secondary" : "primary"}`}
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
      {meetingStatus === "Ongoing" ? (
        <>
          {isRecordingOpen ? (
            <div className="flex-1 h-full">
              <EndOFMeeting role={role} />
            </div>
          ) : isWhiteBoardOpen ? (
            <div className="h-4/5 max-h-4/5">
              <WhiteBoard role={role} users={users} />
            </div>
          ) : (
            <div className="flex-1">
              <OngoingMeeting users={users} />
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 h-full">
          <EndOFMeeting role={role} />
        </div>
      )}
    </div>
  );
};

export default MeetingView;
