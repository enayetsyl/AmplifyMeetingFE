import React, { useState } from 'react'
import { LuArrowLeftToLine, LuArrowRightToLine } from 'react-icons/lu'
import ParticipantLeftSidebarOpenUI from './ParticipantLeftSidebarOpenUI';
import ParticipantLeftSidebarCloseUI from './ParticipantLeftSidebarCloseUI';

const ParticipantLeftSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div >
    <div
      className={`flex ${
        isSidebarOpen ? "w-80" : "w-24"
      } transition-width duration-300 bg-white h-screen rounded-r-xl relative`}
    >
      {isSidebarOpen ? (
        <LuArrowLeftToLine
          className="absolute top-4 right-2 text-black text-sm cursor-pointer "
          onClick={toggleSidebar}
        />
      ) : (
        <LuArrowRightToLine
          className="absolute top-4 right-2 text-black text-sm cursor-pointer "
          onClick={toggleSidebar}
        />
      )}

      <div className="flex flex-col w-full ">
        {/*  */}
        {isSidebarOpen ? (
          <ParticipantLeftSidebarOpenUI/>
        ) : (
          <ParticipantLeftSidebarCloseUI/>
        )}
      </div>
    </div>
  </div>
  )
}

export default ParticipantLeftSideBar