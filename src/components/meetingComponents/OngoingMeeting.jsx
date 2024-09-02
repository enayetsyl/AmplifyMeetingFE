import {
  FaHeadphones,
  FaUserFriends,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { IoCaretDownSharp, IoLogOutSharp } from "react-icons/io5";
import Image from "next/image";
import meetingImage from "../../../public/meeting.jpeg";
import { MdCallEnd, MdScreenShare, MdVerifiedUser } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { PiLineVerticalBold } from "react-icons/pi";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosMicOff } from "react-icons/io";

const OngoingMeeting = ({ users, iframeLink, role }) => {
  console.log("iframeLink inside ongoing meeting", iframeLink);
  return (
    <div className="pt-2 bg-black flex-1 rounded-xl flex flex-col justify-center items-center">
      {/* top bar */}
      <div className="px-10 flex justify-between items-center w-full">
        <div className="flex justify-start items-center gap-3">
          <MdVerifiedUser className="bg-[#111111] rounded-lg p-0.5 text-[#69D569]" />
          <p className="text-white">Original Sound: Off</p>
          <IoCaretDownSharp className="text-white" />
        </div>
        <div className="bg-[#242424] flex justify-between items-center gap-2 p-1 rounded-lg">
          <CgMenuGridR className="text-white" />
          <p className="text-white text-sm">View</p>
        </div>
      </div>
      {/* video stream */}
      <div className="flex-1 py-5 px-10 flex justify-center items-center mb-5">
        {
          role === "Observer" ? (<iframe
            src={iframeLink}
            frameBorder="0"
            width="100%"
            height="500px"
            allowFullScreen
            
          ></iframe>) : (<iframe
            src={iframeLink}
            frameBorder="0"
            width="100%"
            height="500px"
            allowFullScreen
            allow="microphone; camera; display-capture"
          ></iframe>)
        }
        
      </div>
      {/* <div className="flex-1 py-5 px-10 flex justify-center items-center ">
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
        </div> */}
      {/* control bar */}
      {/* <div className="bg-[#1b1b1b] py-2 flex justify-center items-center gap-4 w-full rounded-b-xl">
          <FaHeadphones className="text-custom-gray-2"/>
          <FaVideoSlash className="text-custom-gray-2"/>
          <MdScreenShare className="text-[#2CD95F]"/>
          <FaUserFriends className="text-custom-gray-2" />
          <BsThreeDots className="text-custom-gray-2"/>
          <PiLineVerticalBold  className="text-custom-gray-2"/>
          <MdCallEnd className="text-[#CD3B33]"/>
        </div> */}
    </div>
  );
};

export default OngoingMeeting;
