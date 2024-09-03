"use client"
import { UserButton } from '@clerk/nextjs'

const DashboardHeader = () => {
  return (
    <div className='flex  justify-between p-5 shadow-sm border-b-2'>
      {/* Search Bar */}
      <div>
        <h2 className='font-bold text-lg text-primary'>Finance Tracker</h2>
      </div>
      {/* User Profile */}
      <div>
        <UserButton/>
      </div>
    </div>
  )
}

export default DashboardHeader
