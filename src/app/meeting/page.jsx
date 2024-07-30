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
      image: userImage
    }, 
    {
      id: 2, 
      name: 'Rebecca Nitin',
      image: userImage
    }, 
    {
      id: 3, 
      name: 'Juliet Frazier',
      image: userImage
    }, 
    {
      id: 4, 
      name: 'Hohnny Lewis',
      image: userImage
    }, 
    {
      id: 5, 
      name: 'Raina Smith',
      image: userImage
    }, 
    
  ])
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

  
  
  return (
    <div className='flex justify-center items-center bg-custom-gray-3'>
        <div>
            <LeftSidebar users={users} setUsers={setUsers} />
        </div>
        <div className='flex-grow w-full'>
            <MeetingView/>
        </div>
        <div>
            <RightSidebar observers={observers} setObservers={setObservers}  />
        </div>
    </div>
  )
}

export default page