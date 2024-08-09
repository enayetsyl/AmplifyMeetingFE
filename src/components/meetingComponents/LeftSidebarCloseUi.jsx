import React from "react";
import Button from "../shared/button";
import { LuClipboardSignature } from "react-icons/lu";
import { FaVideo } from "react-icons/fa";
import { BsChatSquareFill } from "react-icons/bs";
import { MdMoveDown } from "react-icons/md";
import Image from "next/image";

const LeftSidebarCloseUi = ({
  users,
  setUsers,
  activeTab,
  setActiveTab,
  currentUser,
  setCurrentUser,
  selectedChat,
  setSelectedChat,
  isWaiting,
  setIsWaiting,
  handleTabClick,
  chatParticipants,
  role,
  toggleWhiteBoard,
  toggleRecordingButton
}) => {
  return (
    <>
      {/* Whiteboard and local recording */}
      <div className=" lg:pt-10 px-6">
        <Button
          variant="meeting"
          type="submit"
          className="w-full  rounded-xl justify-center py-2 pl-1.5  mb-2"
          icon={
            <LuClipboardSignature className="bg-[#fcd860] p-1 text-white text-2xl rounded-md font-bold" />
          }
          onClick={toggleWhiteBoard}
        />
        <Button
          variant="meeting"
          type="submit"
          className="w-full  rounded-xl justify-center py-2 pl-1.5 mb-2"
          icon={
            <FaVideo className="bg-custom-orange-1 p-1 text-white text-2xl rounded-md font-bold" />
          }
          onClick={toggleRecordingButton}
        />
      </div>
      {/* Backroom chat and icon */}
      <div className="flex justify-center items-center py-4 ">
        <BsChatSquareFill className="text-custom-dark-blue-1" />
      </div>


     {/* chat container */}
     <div className="flex flex-col pb-2 pt-4 bg-custom-gray-8 mb-2 rounded-xl overflow-y-auto mx-1">
        <div className="flex flex-col justify-center items-center gap-2 pb-2 ">
          <Button
            children="Participants List"
            variant="default"
            type="submit"
            className={`w-full py-2 rounded-xl  text-[8px] text-center px-0.5  ${
              activeTab === "participantList"
                ? "shadow-[0px_4px_6px_#1E656D4D]"
                : "bg-custom-gray-8 border  border-custom-teal !text-custom-teal "
            }  `}
            onClick={() => handleTabClick("participantList")}
          />
          <div className="w-full relative">
            <Button
              children="Participants Chat"
              variant="default"
              type="submit"
              className={`w-full py-2 rounded-xl text-[8px] text-center px-0.5  ${
                activeTab === "participantChat"
                  ? "shadow-[0px_4px_6px_#1E656D4D]"
                  : "bg-custom-gray-8 border  border-custom-teal !text-custom-teal "
              }  `}
              onClick={() => handleTabClick("participantChat")}
            />
            <div className="absolute -top-1 right-1 w-2 h-2 rounded-lg bg-[#ff2b2b] shadow-[0px_1px_3px_#00000036]"></div>
          </div>
        </div>

        {/* participants container */}

        {/* participants list */}
        {activeTab === "participantList" && (
          <div className="flex-grow pt-2 overflow-y-scroll">
            {/* participant continer */}
            {users?.map((user) => (
              <div
                className="flex justify-center items-center gap-2 py-1"
                key={user.id}
              >
                <Image
                  src={user.image}
                  alt="user image"
                  height={40}
                  width={40}
                  className="rounded-2xl border-[3px] border-white border-solid"
                />
              </div>
            ))}
          </div>
        )}

        {/* Participant chat */}
        {activeTab === "participantChat" &&
          !selectedChat &&
          chatParticipants.map((chat) => (
            <div
              key={chat.id}
              className="bg-custom-gray-2 p-2 flex justify-center items-center gap-2 border-b border-solid border-custom-gray-1 cursor-pointer relative"
              onClick={() => setSelectedChat(chat)}
            >
              <Image
                src={chat.image}
                alt="chat-user-image"
                height={40}
                width={40}
                className="rounded-[50%]"
              />

              {chat.unreadCount > 0 && (
                <p className="py-0.5 px-1 text-white bg-[#ff2b2b] rounded-[50%] absolute top-1 right-5 text-[8px]">
                  {chat.unreadCount}
                </p>
              )}
            </div>
          ))}
      </div>
      {/* waiting list */}
      {isWaiting && activeTab === "participantList" && role === 'Moderator' && (
        <div className="pt-2 bg-custom-gray-8 py-4 rounded-xl mb-2 overflow-y-scroll mx-1">
          <div className="flex justify-center items-center py-2">
            <h1 className="font-bold text-[9px] ">
              Waiting ({isWaiting.length})
            </h1>
          </div>
          {/* participant continer */}
          {isWaiting?.map((user) => (
            <div
              className="flex justify-center items-center gap-2 py-1"
              key={user.name}
            >
              <Image
                src={user.image}
                alt="user image"
                height={40}
                width={40}
                className="rounded-2xl border-[3px] border-white border-solid"
              />
            </div>
          ))}
        </div>
      )}
 
    </>
  );
};

export default LeftSidebarCloseUi;
