import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaHeadphones, FaUserFriends, FaVideoSlash } from "react-icons/fa";
import { IoIosMicOff } from "react-icons/io";
import { MdCallEnd, MdScreenShare } from "react-icons/md";
import { PiLineVerticalBold } from "react-icons/pi";
import whiteboardImage from '../../../public/white-board.jpg'

const WhiteBoard = ({ role, users }) => {
  const [isSeeMoreModalOpen, setIsSeeMoreModalOpen] = useState(false);
  const modalRef = useRef()

  const handleToggleSeeMoreModal = () => {
    setIsSeeMoreModalOpen(!isSeeMoreModalOpen);
  };

    
    const closeModal = () => {
      setIsSeeMoreModalOpen(false);
    };
  
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
  
    useEffect(() => {
      if (isSeeMoreModalOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isSeeMoreModalOpen]);
  


  return (
    <div className="bg-white flex justify-start items-center rounded-xl h-full">
      {/* video */}
      <div className="w-1/5 bg-black rounded-l-xl pt-2 h-full ">
        <div className="grid grid-cols-1 gap-3  h-full px-3">
          {users &&
            users?.map((user) => (
              <div className="relative">
                <Image
                  src={user.image}
                  alt="participant image"
                  height={120}
                  width={150}
                  className=""
                />
                <div className="absolute bottom-0 left-0 bg-black flex justify-center items-center gap-1 px-1.5 py-0.5">
                  {user.isSilent ? (
                    <IoIosMicOff className="text-custom-red text-[10px]" />
                  ) : (
                    ""
                  )}
                  <p className="text-white text-[8px]">{user.name}</p>
                </div>
              </div>
            ))}
        </div>
        {/* control bar */}
        <div className="bg-[#1b1b1b] py-2 flex justify-center items-center gap-2  w-full rounded-bl-xl relative">
          <FaHeadphones className="text-custom-gray-2" />
          <FaVideoSlash className="text-custom-gray-2" />

          <BsThreeDots
            onClick={handleToggleSeeMoreModal}
            className="text-custom-gray-2 cursor-pointer"
          />
          <MdCallEnd className="text-[#CD3B33]" />
          {isSeeMoreModalOpen && (
            <div 
            ref={modalRef}
            className="bg-[#1b1b1b] flex  justify-center items-center gap-2 p-2 absolute -top-8 left-10">
              <MdScreenShare
              onClick={closeModal}
              className="text-[#2CD95F]" />
              <FaUserFriends 
              onClick={closeModal}
              className="text-custom-gray-2" />
            </div>
          )}
        </div>
      </div>
      {/* White board */}
      <div className="w-4/5 rounded-r-xl">
      <Image
      src={whiteboardImage}
      alt="Whiteboard Image"
      height={200}
      width={300}
      className="w-full h-full rounded-r-xl"
      />
      </div>
    </div>
  );
};

export default WhiteBoard;
