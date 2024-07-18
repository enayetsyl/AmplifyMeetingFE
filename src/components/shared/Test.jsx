import React from 'react'
import Logo from './Logo'
import DashboardSidebar from './DashboardSidebar'

const Test = () => {
  return (
    <DashboardSidebar>
        <div className='flex flex-col justify-center items-center '>
    <Logo/>
     <div>
       <div>
         <p className='text-base text-black'>Projects</p>
       </div>
       <div>
         <p>Moderators</p>
       </div>
     </div>
    </div>
    </DashboardSidebar>
  )
}

export default Test