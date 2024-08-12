'use client'
import LeftSidebar from '@/components/meetingComponents/LeftSidebar'
import MeetingView from '@/components/meetingComponents/MeetingView'
import RightSidebar from '@/components/meetingComponents/RightSidebar'
import React, { useState } from 'react'
import userImage from '../../../public/user.jpg'

const page = () => {
  const [users, setUsers] = useState([
    {
      id: 1, 
      name: 'Victoria Armstrong',
      image: userImage,
      isSilent: false,
    }, 
    {
      id: 2, 
      name: 'Rebecca Nitin',
      image: userImage,
      isSilent: true,
    }, 
    {
      id: 3, 
      name: 'Juliet Frazier',
      image: userImage,
      isSilent: true,
    }, 
    {
      id: 4, 
      name: 'Hohnny Lewis',
      image: userImage,
      isSilent: true,
    }, 
    {
      id: 5, 
      name: 'Raina Smith',
      image: userImage,
      isSilent: true,
    }, 
    {
      id: 6, 
      name: 'Alice Johnson',
      image: userImage,
      isSilent: true,
    },
    {
      id: 7,
      name: 'Michael Brown',
      image: userImage,
      isSilent: true,
    },
    {
      id: 8,
      name: 'Emma Wilson',
      image: userImage,
      isSilent: true,
    }
  ]);
  const [observers, setObservers] = useState([
    {
      id: 10, 
      name: 'Victoria Armstrong',
      image: userImage
    }, 
    {
      id: 20, 
      name: 'Rebecca Nitin',
      image: userImage
    }, 
    {
      id: 30, 
      name: 'Juliet Frazier',
      image: userImage
    }, 
    {
      id: 40, 
      name: 'Hohnny Lewis',
      image: userImage
    }, 
    {
      id: 50, 
      name: 'Raina Smith',
      image: userImage
    }, 
    
  ])
  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(false)
  const [isRecordingOpen, setIsRecordingOpen] = useState(false)

  const [isBreakoutRoom, setIsBreakoutRoom] = useState(true);
  const [breakoutRooms, setBreakoutRooms] = useState([
    {
      roomName: 'Room A: Group 1',
      participants: [
        { id: 1, name: 'Victoria Armstrong', image: userImage },
        { id: 2, name: 'Rebecca Nitin', image: userImage },
        { id: 3, name: 'Juliet Frazier', image: userImage },
        { id: 4, name: 'Hohnny Lewis', image: userImage },
        { id: 5, name: 'Raina Smith', image: userImage },
        { id: 6, name: 'Alice Johnson', image: userImage },
        { id: 7, name: 'Michael Brown', image: userImage },
        { id: 8, name: 'Emma Wilson', image: userImage },
      ],
    },
    {
      roomName: 'Room B: Group 2',
      participants: [
        { id: 10, name: 'Victoria Armstrong', image: userImage },
        { id: 20, name: 'Rebecca Nitin', image: userImage },
        { id: 30, name: 'Juliet Frazier', image: userImage },
        { id: 40, name: 'Hohnny Lewis', image: userImage },
        { id: 50, name: 'Raina Smith', image: userImage },
      ],
    },
    {
      roomName: 'Room C: Group 3',
      participants: [
        { id: 100, name: 'Victoria Armstrong', image: userImage },
        { id: 200, name: 'Rebecca Nitin', image: userImage },
        { id: 300, name: 'Juliet Frazier', image: userImage },
        { id: 400, name: 'Hohnny Lewis', image: userImage },
        { id: 500, name: 'Raina Smith', image: userImage },
      ],
    },
  ]);
  const [selectedRoom, setSelectedRoom] = useState(breakoutRooms[0]);
  // const role = 'Participant'
  // const role = 'Observer'
  // const role = 'Moderator'
  const role = 'Admin'

  const meetingStatus = 'Ongoing'
  // const meetingStatus = 'End'

  const projectStatus = 'Open'
  // const projectStatus = 'Paused'
  // const projectStatus = 'Closed'

  const handleBreakoutRoomChange = (roomName) => {
    const room = breakoutRooms.find((room) => room.roomName === roomName);
    setSelectedRoom(room);
  };
  
  
  return (
    <div className='flex justify-between  min-h-screen max-h-screen meeting_bg'>
        <div className='h-full '>
            <LeftSidebar users={users} setUsers={setUsers} 
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
        <div className='flex-1 w-full max-h-[100 vh] overflow-hidden'>
            <MeetingView
            role={role}
            users={users}
            isWhiteBoardOpen={isWhiteBoardOpen}
            setIsWhiteBoardOpen={setIsWhiteBoardOpen}
            meetingStatus={meetingStatus}
            isRecordingOpen={isRecordingOpen}
            setIsRecordingOpen={setIsRecordingOpen}
            isBreakoutRoom={isBreakoutRoom}
            setIsBreakoutRoom={setIsBreakoutRoom}
            breakoutRooms={breakoutRooms}
            setBreakoutRooms={setBreakoutRooms}
            projectStatus={projectStatus}
            />
        </div>
       {
        role !== 'Participant' && (
          <div className='h-full'>
          <RightSidebar observers={observers} setObservers={setObservers} 
          isBreakoutRoom={isBreakoutRoom}
          setIsBreakoutRoom={setIsBreakoutRoom}
          breakoutRooms={breakoutRooms}
          setBreakoutRooms={setBreakoutRooms}
          />
      </div>
        )
       }
    </div>
  )
}

export default page