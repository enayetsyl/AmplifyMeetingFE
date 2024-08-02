import React, { useEffect, useRef, useState } from "react";
import Button from "../shared/button";
import Image from "next/image";
import { LuClipboardSignature } from "react-icons/lu";
import { FaVideo } from "react-icons/fa";
import {
  BsChatSquareDotsFill,
  BsChatSquareFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import HeadingLg from "../shared/HeadingLg";
import Search from "../singleComponent/Search";
import { IoMdMic } from "react-icons/io";
import userImage from "../../../public/user.jpg";
import groupChatImage from "../../../public/group-chat.png";
import { IoClose, IoRemoveCircle, IoSend } from "react-icons/io5";
import { MdInsertEmoticon, MdMoveDown } from "react-icons/md";
import RemoveUserModal from "../singleComponent/RemoveUserModal";
import MoveToWaitingRoomModal from "../singleComponent/MoveToWaitingRoomModal";
import toast from "react-hot-toast";
import notify from "@/utils/notify";

const LeftSidebarOpenUi = ({
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
  toggleWhiteBoard
}) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isModeratorPopupModalOpen, setIsModeratorPopupModalOpen] =
    useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [userToMove, setUserToMove] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const modalRef = useRef();

  const handleSearch = () => {
    // Write search functionality here
  };

  const toggleRemoveAndWaitingOptionModal = (event, user) => {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top, left });
    setCurrentUser(user);
    setUserToRemove(user);
    setIsModeratorPopupModalOpen(!isModeratorPopupModalOpen);
  };

  const openRemoveUserModal = (event, user) => {
    setUserToRemove(user);
    setIsRemoveModalOpen(true);
  };
  const closeRemoveUserModal = () => {
    setIsRemoveModalOpen(false);
  };

  const openMoveUserModal = (event, user) => {
    
    setUserToMove(user);
    setIsMoveModalOpen(true);
  };
  const closeMoveUserModal = () => {
    setIsMoveModalOpen(false);
  };

  const closeModal = () => {
    setIsModeratorPopupModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModeratorPopupModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModeratorPopupModalOpen]);

  const handleRemoveUser = (userId) => {
    const userName = users.find(user => user.id === userId)
    notify('success', 'Success', `${userName.name} has been removed`);
    notify('error', 'Error', `${userName.name} has been removed`);
    notify('warning', 'Warning', `${userName.name} has been removed`);
    notify('info', 'Info', `${userName.name} has been removed`);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setIsRemoveModalOpen(false);
  };

  const handleMoveUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setIsMoveModalOpen(false);
  };

  
  return (
    <>
      {/* Whiteboard and local recording */}
      <div className=" lg:pt-10 px-4">
        <Button
          children="Whiteboard"
          variant="meeting"
          type="submit"
          className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
          icon={
            <LuClipboardSignature className="bg-[#fcd860] p-1 text-white text-2xl rounded-md font-bold" />
          }
          onClick={toggleWhiteBoard}
        />
        <Button
          children="Local Recording"
          variant="meeting"
          type="submit"
          className="w-full py-2 rounded-xl !justify-start pl-2 mb-2"
          icon={
            <FaVideo className="bg-custom-orange-1 p-1 text-white text-2xl rounded-md font-bold" />
          }
          
        />
      </div>

      {/* Backroom chat and icon */}
      <div className="flex justify-start items-center gap-2 lg:py-4 mx-4">
        <BsChatSquareFill className="text-custom-dark-blue-1" />
        <HeadingLg children="BACKROOM CHAT" />
      </div>

      {/* chat container */}
      <div className="flex flex-col flex-grow px-4 pb-2 pt-4 bg-custom-gray-8 mb-4 rounded-xl overflow-y-auto mx-4">
        <div className="flex justify-center items-center gap-2 pb-2 ">
          <Button
            children="Participants List"
            variant="default"
            type="submit"
            className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  ${
              activeTab === "participantList"
                ? "shadow-[0px_4px_6px_#1E656D4D]"
                : "bg-custom-gray-8 border-2  border-custom-teal !text-custom-teal "
            }  `}
            onClick={() => handleTabClick("participantList")}
          />
          <div className="w-full relative">
            <Button
              children="Participants Chat"
              variant="default"
              type="submit"
              className={`w-full py-2 rounded-xl pl-2  text-[10px] text-center px-1  ${
                activeTab === "participantChat"
                  ? "shadow-[0px_4px_6px_#1E656D4D]"
                  : "bg-custom-gray-8 border-2  border-custom-teal !text-custom-teal "
              }  `}
              onClick={() => handleTabClick("participantChat")}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-lg bg-[#ff2b2b] shadow-[0px_1px_3px_#00000036]"></div>
          </div>
        </div>

        {/* participants container */}

        {/* participants list */}
        {activeTab === "participantList" && (
          <div className="flex-grow pt-2">
            <Search
              placeholder="Search Name"
              onSearch={handleSearch}
              inputClassName="!bg-[#F3F4F5] !rounded-xl "
              iconClassName="!bg-[#EBEBEB]"
            />
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
                <p className="text-[#1a1a1a] text-[10px] flex-grow">
                  {user.name}
                </p>
                <IoMdMic />
                <BsChatSquareDotsFill />
                <BsThreeDotsVertical
                  onClick={(event) =>
                    toggleRemoveAndWaitingOptionModal(event, user)
                  }
                  className="cursor-pointer"
                />
              </div>
            ))}
            {isModeratorPopupModalOpen && currentUser && (
              <div
                ref={modalRef}
                className="absolute bg-white shadow-[0px_3px_6px_#0000004A] rounded-lg w-44"
                style={{
                  top: modalPosition.top + 20,
                  left: modalPosition.left - 30,
                }}
              >
                <ul className="text-[12px]">
                  <li
                    className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                    onClick={(e) => openRemoveUserModal(e, userToRemove)}
                  >
                    <IoRemoveCircle />
                    <span>Remove</span>
                  </li>
                  <li
                    className="py-2 px-2 hover:bg-gray-200 cursor-pointer text-[#697e89] flex justify-start items-center gap-2"
                    onClick={(e) => openMoveUserModal(e, currentUser)}
                  >
                    <MdMoveDown />
                    <span>Move to Waiting Room</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Participant chat */}
        {activeTab === "participantChat" &&
          !selectedChat &&
          chatParticipants.map((chat) => (
            <div
              key={chat.id}
              className="bg-custom-gray-2 p-2 flex justify-center items-center gap-2 border-b border-solid border-custom-gray-1 cursor-pointer"
              onClick={() => setSelectedChat(chat)}
            >
              <Image
                src={chat.image}
                alt="chat-user-image"
                height={40}
                width={40}
                className="rounded-[50%]"
              />
              <div className="flex-grow-1 text-xs ">
                <p className="pb-1 font-bold">{chat.name}</p>
                <p className={`${chat.unreadCount > 0 ? "font-bold" : ""}`}>
                  {chat.messagePreview}
                </p>
              </div>
              <div className="flex flex-col justify-end items-end text-xs">
                <p className="pb-1">{chat.time}</p>
                {chat.unreadCount > 0 && (
                  <p className="py-0.5 px-1.5 text-white bg-[#ff2b2b] rounded-[50%]">
                    {chat.unreadCount}
                  </p>
                )}
              </div>
            </div>
          ))}

        {activeTab === "participantChat" && selectedChat && (
          <div className="flex-grow pt-2  rounded-xl flex flex-col justify-center items-center">
            {/* chat name and image */}
            <div className="flex w-full items-center justify-center gap-2 mb-4 bg-custom-gray-4 p-2">
              <Image
                src={selectedChat.image}
                alt="chat-user-image"
                height={30}
                width={30}
                className="rounded-[50%]"
              />
              <p className="text-[#1a1a1a] text-[12px] font-bold flex-1">
                {selectedChat.name}
              </p>
              <IoClose
                className="text-custom-black cursor-pointer"
                onClick={() => setSelectedChat(null)}
              />
            </div>
            {/* chat message */}
            <div className="flex flex-col gap-2 flex-grow">
              {selectedChat.messages.map((message, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2"
                >
                  <p className="text-[#1a1a1a] text-[12px] f">
                    <span className="font-bold">{message.sender}:</span>{" "}
                    {message.content}
                  </p>
                  <p className="text-[#1a1a1a] text-[10px] text-end">
                    {message.time}
                  </p>
                </div>
              ))}
            </div>
            {/* send message */}
            <div className="flex justify-between items-center gap-2 relative">
              <input
                type="text"
                placeholder="Type Message"
                className="rounded-lg py-1 px-2 placeholder:text-[10px]"
              />
              <div className="absolute right-11 cursor-pointer">
                <MdInsertEmoticon />
              </div>
              <div className="py-1.5 px-1.5 bg-custom-orange-2 rounded-[50%] text-white cursor-pointer text-sm">
                <IoSend />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* waiting list */}
      {isWaiting && activeTab === "participantList" && role === "Moderator" && (
        <div className="flex-grow pt-2 bg-custom-gray-8 p-4 rounded-xl mb-4 overflow-y-auto mx-4">
          <div className="flex justify-between items-center py-2">
            <h1 className="font-bold text-sm ">Waiting ({isWaiting.length})</h1>
            <Button
              variant="primary"
              type="submit"
              children="Admit All"
              className="text-xs px-2 py-1 rounded-lg text-white"
            />
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
              <p className="text-[#1a1a1a] text-[10px] flex-grow">
                {user.name}
              </p>
              <div className="flex justify-center items-center gap-1">
                <Button
                  variant="primary"
                  type="submit"
                  children="Admit"
                  className="text-xs px-2 py-1 rounded-lg text-white"
                />
                <Button
                  type="submit"
                  children="Remove"
                  className="text-xs px-2 py-1 rounded-lg text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {isRemoveModalOpen && (
        <RemoveUserModal
          onClose={closeRemoveUserModal}
          handleRemoveUser={() => handleRemoveUser(userToRemove.id)}
          userToRemove={userToRemove}
        />
      )}
      {isMoveModalOpen && (
        <MoveToWaitingRoomModal
          onClose={closeMoveUserModal}
          handleMoveUser={() => handleMoveUser(userToMove.id)}
          userToMove={userToMove}
        />
      )}
    </>
  );
};

export default LeftSidebarOpenUi;
