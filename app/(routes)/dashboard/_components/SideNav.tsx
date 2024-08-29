"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function SideNav() {
  interface SideNavItem {
    id: number
    title?: string
    route: string
    activeImage?: React.ReactNode
  }
   
  // Get the current URL pathname
  const curr_route = usePathname()

  const SideNavData: SideNavItem[] = [
    {
      id: 1,
      title: 'Dashboard',
      activeImage: <LayoutGrid/>,
      route: '/dashboard',
    },
    {
      id: 2,
      title: 'Budgets',
      activeImage: <PiggyBank/>,
      route: '/dashboard/budgets',
    },

    {
      id: 3,
      title: 'Expenses',
      activeImage: <ReceiptText/>,
      route: '/dashboard/expenses',
    },

    {
      id: 4,
      title: 'Upgrade',
      activeImage: <ShieldCheck/>,
      route: '/dashboard/upgrade',
    },

    {
      id: 5,
      title: 'Logout',
      activeImage: <LogOut/>,
      route: 'logout',
    },
  ]

  const { user } = useUser();
  
  return (
    <div className='h-screen p-5 border-2 shadow-sm'>
      <Image
      src={'./logo.svg'}
      alt="Expense Tracker Logo"
      width={160}
      height={100}
      />
      {
        SideNavData.map((data, index) => (
          <Link href={data.route} key={data.id}>
            <div  className={`flex mt-2 gap-2 items-center font-medium text-gray-500
              p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 ${curr_route == data.route && 'text-primary bg-blue-200'}`}>
              <p>{data.activeImage}</p>
              <h1>{data.title}</h1>
            </div>
          </Link>
        ))
      }
      <div className='fixed bottom-10 flex p-5 gap-2 items-center'>
        <UserButton/>
        <div className='text-gray-500'>
          <p>{ user?.fullName}</p>
          <p>{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
    </div>
  )
}

export default SideNav
