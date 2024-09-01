"use client";
import LeftSidebar from "@/components/meetingComponents/LeftSidebar";
import MeetingView from "@/components/meetingComponents/MeetingView";
import RightSidebar from "@/components/meetingComponents/RightSidebar";
import React, { useEffect, useState } from "react";
import userImage from "../../../../public/user.jpg";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import io from "socket.io-client";
import { useGlobalContext } from "@/context/GlobalContext";

const page = () => {
  const [users, setUsers] = useState([]);
  const { user } = useGlobalContext();
  const [participants, setParticipants] = useState([]);
  const [observers, setObservers] = useState([]);
  const searchParams = useSearchParams();
  const fullName = searchParams.get("fullName");
  const userRole = searchParams.get("role");
  const [role, setRole] = useState("");
  const params = useParams();

  const [isMeetingOngoing, setIsMeetingOngoing] = useState(false);

  const [waitingRoom, setWaitingRoom] = useState([]);
  const [isAdmitted, setIsAdmitted] = useState(false);
  const [socket, setSocket] = useState(null);

  console.log("isMeetingOngoing", isMeetingOngoing);
  // const meetingStatus = "Ongoing";
  const projectStatus = "Open";

  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false);
  const [isRecordingOpen, setIsRecordingOpen] = useState(false);

  const [isBreakoutRoom, setIsBreakoutRoom] = useState(false);
  const [breakoutRooms, setBreakoutRooms] = useState([
    {
      roomName: "Room A: Group 1",
      participants: [
        { id: 1, name: "Victoria Armstrong", image: userImage },
        { id: 2, name: "Rebecca Nitin", image: userImage },
        { id: 3, name: "Juliet Frazier", image: userImage },
        { id: 4, name: "Hohnny Lewis", image: userImage },
        { id: 5, name: "Raina Smith", image: userImage },
        { id: 6, name: "Alice Johnson", image: userImage },
        { id: 7, name: "Michael Brown", image: userImage },
        { id: 8, name: "Emma Wilson", image: userImage },
      ],
    },
    {
      roomName: "Room B: Group 2",
      participants: [
        { id: 10, name: "Victoria Armstrong", image: userImage },
        { id: 20, name: "Rebecca Nitin", image: userImage },
        { id: 30, name: "Juliet Frazier", image: userImage },
        { id: 40, name: "Hohnny Lewis", image: userImage },
        { id: 50, name: "Raina Smith", image: userImage },
      ],
    },
  ]);
  const [selectedRoom, setSelectedRoom] = useState(breakoutRooms[0]);

  const [peers, setPeers] = useState([]);
  const [streams, setStreams] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleBreakoutRoomChange = (roomName) => {
    const room = breakoutRooms.find((room) => room.roomName === roomName);
    setSelectedRoom(room);
  };


  
  

  const acceptParticipant = (participant) => {
    
  };

  const addToPeersOrStreams = (participant) => {
    
  };
  
  const startMeeting = () => {
   
  };

  const sendMessage = () => {
 
  };

  return (
    <>
      <div className="flex justify-between min-h-screen max-h-screen meeting_bg">
        {role === "Participant" && !isAdmitted ? (
          <div className="flex items-center justify-center w-full min-h-screen bg-white ">
            <h1 className="text-2xl font-bold">
              Please wait, the meeting host will let you in soon.
            </h1>
          </div>
        ) : role === "Participant" && isAdmitted ? (
          // Main participant UI goes here
          <>
            <div className="h-full">
              <LeftSidebar
                users={peers}
                setUsers={setUsers}
                role={role}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                handleBreakoutRoomChange={handleBreakoutRoomChange}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                messages={messages}
                sendMessage={sendMessage}
                userName={fullName}
                meetingId={params.id}
              />
            </div>
            <div className="flex-1 w-full max-h-[100vh] overflow-hidden">
              <MeetingView
                role={role}
                users={peers}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                meetingStatus={isMeetingOngoing}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                projectStatus={projectStatus}
              />
            </div>
          </>
        ) :  userRole === "Moderator" ? (
          <>
            <div className="h-full">
              <LeftSidebar
                users={peers}
                setUsers={setUsers}
                role={role}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                handleBreakoutRoomChange={handleBreakoutRoomChange}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                waitingRoom={waitingRoom}
                acceptParticipant={acceptParticipant}
                messages={messages}
                sendMessage={sendMessage}
                userName={fullName}
                meetingId={params.id}
              />
            </div>
            <div className="flex-1 w-full max-h-[100vh] overflow-hidden">
              <MeetingView
                role={role}
                users={peers}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                meetingStatus={isMeetingOngoing}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                projectStatus={projectStatus}
              />
            </div>
            <div className="h-full">
              <RightSidebar
                observers={observers}
                setObservers={setObservers}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
              />
            </div>
          </>
        ) : role === "Observer" && isMeetingOngoing ? (
          <>
            <div className="h-full">
              <LeftSidebar
                users={users}
                setUsers={setUsers}
                role={role}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                handleBreakoutRoomChange={handleBreakoutRoomChange}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
            </div>
            <div className="flex-1 w-full max-h-[100vh] overflow-hidden">
              <MeetingView
                role={role}
                users={users}
                isWhiteBoardOpen={isWhiteBoardOpen}
                setIsWhiteBoardOpen={setIsWhiteBoardOpen}
                meetingStatus={isMeetingOngoing}
                isRecordingOpen={isRecordingOpen}
                setIsRecordingOpen={setIsRecordingOpen}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
                projectStatus={projectStatus}
              />
            </div>
            <div className="h-full">
              <RightSidebar
                observers={observers}
                setObservers={setObservers}
                isBreakoutRoom={isBreakoutRoom}
                setIsBreakoutRoom={setIsBreakoutRoom}
                breakoutRooms={breakoutRooms}
                setBreakoutRooms={setBreakoutRooms}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full min-h-screen bg-white ">
            <h1 className="text-2xl font-bold">
              Please wait, the meeting host will let you in soon.
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
