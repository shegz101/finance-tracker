import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='flex  justify-between p-5 shadow-sm border-b-2'>
      {/* Search Bar */}
      <div>
        Search Bar
      </div>
      {/* User Profile */}
      <div>
        <UserButton/>
      </div>
    </div>
  )
}

export default DashboardHeader
