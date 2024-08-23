import React from 'react'
import SideNav from './_components/SideNav';

function DashboardLayout({children}: any) {
  return (
    <div>
        <div className='fixed md:w-72 hidden md:block'>
            <SideNav/>
        </div>

        <div className='md:ml-72 bg-green-200'>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout;