"use client"
import { useState } from "react"
import { UserButton } from '@clerk/nextjs'
import { MenuIcon, X } from 'lucide-react'
import SideNav from "./SideNav"

const DashboardHeader = () => {
  const [trackHamburgerIcon, setTrackHamburgerIcon] = useState<boolean>(false);

  const handleSideNavReveal = () => {
    setTrackHamburgerIcon(!trackHamburgerIcon);
  }
  return (
    <div className="p-3 md:p-5 shadow-sm border-b-2">
      <div className='flex justify-between'>
        {/* Search Bar */}
        <div className='gap-2 items-center flex'>
          <button className='text-primary md:hidden' onClick={handleSideNavReveal}>
            {
              trackHamburgerIcon ? (
                <X/>
              ) : (
                <MenuIcon/>
              )
            }
          </button>
          <h2 className='font-bold text-lg text-primary'>Finance Tracker</h2>
        </div>

        {/* User Profile */}
        <div>
          <UserButton/>
        </div>
      </div>
      <div className="bg-white m-[-12px] md:m-[-20px] md:hidden mt-3 w-[85vw] absolute z-20">
        {
          trackHamburgerIcon && (
            <div className="bg-white">
              <SideNav/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default DashboardHeader
