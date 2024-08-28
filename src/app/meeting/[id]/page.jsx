"use client";
import LeftSidebar from "@/components/meetingComponents/LeftSidebar";
import MeetingView from "@/components/meetingComponents/MeetingView";
import RightSidebar from "@/components/meetingComponents/RightSidebar";
import React, { useEffect, useState } from "react";
import userImage from "../../../../public/user.jpg";
import axios from "axios";
import {  useSearchParams } from "next/navigation";
import io from "socket.io-client";
import { useGlobalContext } from "@/context/GlobalContext";

const page = () => {
  const [users, setUsers] = useState([]);
  const {user } = useGlobalContext()
  console.log('user', user)
  const [observers, setObservers] = useState([]);

  const searchParams = useSearchParams();
  const fullName = searchParams.get('fullName');
  const userRole = searchParams.get('role');
  const [role, setRole] = useState("");

  const [isMeetingOngoing, setIsMeetingOngoing] = useState(false)

  const [waitingRoom, setWaitingRoom] = useState([]);
  const [isAdmitted, setIsAdmitted] = useState(false);
  const [socket, setSocket] = useState(null);

  console.log('isMeetingOngoing', isMeetingOngoing)
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



  const handleBreakoutRoomChange = (roomName) => {
    const room = breakoutRooms.find((room) => room.roomName === roomName);
    setSelectedRoom(room);
  };

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io("http://localhost:8008/participant-namespace");
    setSocket(newSocket);

    // Listen for participant admission
    newSocket.on("participantAdmitted", (participant) => {
      if (participant.name === fullName) {
        console.log("You have been admitted to the meeting!");
        setIsAdmitted(true); // Update the UI to show the meeting
      }
    });

    // Listen for updates to the waiting room (for moderators)
    newSocket.on("waitingRoomUpdate", (updatedWaitingRoom) => {
      setWaitingRoom(updatedWaitingRoom);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [fullName]);

  useEffect(() => {
    if (fullName && userRole) {
      if (userRole === "Participant") {
        setRole("Participant");
        socket?.emit("joinMeeting", { name: fullName });
      } else if (userRole === "Observer") {
        setObservers((prevObservers) => [
          ...prevObservers,
          { id: prevObservers.length + 50, name: fullName, image: userImage },
        ]);
        setRole("Observer");
      } else if (userRole === "Moderator") {
        setRole("Moderator");
      } else if (userRole === "Admin") {
        setObservers((prevObservers) => [
          ...prevObservers,
          { id: prevObservers.length + 50, name: fullName, image: userImage },
        ]);
        setRole("Admin");
      }
    }
  }, [fullName, userRole, socket]);

  const acceptParticipant = (participant) => {
    socket.emit("admitParticipant", participant.socketId);
    setWaitingRoom((prevWaitingRoom) =>
      prevWaitingRoom.filter((p) => p.socketId !== participant.socketId)
    );
    setUsers((prevUsers) => [...prevUsers, participant]);
  };
  
  const startMeeting = () => {
    setIsMeetingOngoing(true);
    socket.emit("startMeeting"); // Emit event to notify that the meeting has started
  };
  
  useEffect(() => {
    socket?.on("meetingStarted", () => {
      setIsMeetingOngoing(true);
    });
  
    return () => {
      socket?.off("meetingStarted");
    };
  }, [socket]);
  


return (
  <>
    <div className="flex justify-between min-h-screen max-h-screen meeting_bg">
      {role === "Participant" &&  !isAdmitted ? (
        <div className="flex items-center justify-center w-full min-h-screen bg-white ">
          <h1 className="text-2xl font-bold">Please wait, the meeting host will let you in soon.</h1>
        </div>
      ) : role === "Participant" && isAdmitted ? (
        // Main participant UI goes here
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
        </>
      ) : role === "Moderator" && !isMeetingOngoing ? (
        <div className="flex items-center justify-center w-full h-full">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
            onClick={startMeeting}
          >
            Start Meeting
          </button>
        </div>
      ) : role === "Moderator" && isMeetingOngoing ? (
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
              waitingRoom={waitingRoom}
              acceptParticipant={acceptParticipant}
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
          <h1 className="text-2xl font-bold">Please wait, the meeting host will let you in soon.</h1>
        </div>
      )
        
      }
    </div>
  </>
);

  
};

export default page;
