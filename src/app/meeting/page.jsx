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
  const [isWhiteBoardOpen, setIsWhiteBoardOpen] = useState(true)

  const role = 'Participant'
  // const role = 'Observer'
  // const role = 'Moderator'
  // const role = 'Admin'

  const meetingStatus = 'Ongoing'
  // const meetingStatus = 'End'
  
  
  return (
    <div className='flex justify-between  min-h-screen max-h-screen meeting_bg'>
        <div className='h-full '>
            <LeftSidebar users={users} setUsers={setUsers} 
            role={role}
            isWhiteBoardOpen={isWhiteBoardOpen}
            setIsWhiteBoardOpen={setIsWhiteBoardOpen}
            />
        </div>
        <div className='flex-1 w-full max-h-[100 vh] overflow-hidden'>
            <MeetingView
            role={role}
            users={users}
            isWhiteBoardOpen={isWhiteBoardOpen}
            setIsWhiteBoardOpen={setIsWhiteBoardOpen}
            meetingStatus={meetingStatus}
            />
        </div>
       {
        role !== 'Participant' && (
          <div className='h-full'>
          <RightSidebar observers={observers} setObservers={setObservers}  />
      </div>
        )
       }
    </div>
  )
}

export default page