"use client"
import { UserButton, useUser, useClerk } from '@clerk/nextjs'
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
    onClick?: () => void; // Add onClick handler
  }
   
  const curr_route = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk(); // Access the signOut function

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/'; // Redirect to homepage after logout
  };

  const SideNavData: SideNavItem[] = [
    {
      id: 1,
      title: 'Dashboard',
      activeImage: <LayoutGrid />,
      route: '/dashboard',
    },
    {
      id: 2,
      title: 'Budgets',
      activeImage: <PiggyBank />,
      route: '/dashboard/budgets',
    },
    {
      id: 3,
      title: 'Expenses',
      activeImage: <ReceiptText />,
      route: '/dashboard/expenses',
    },
    {
      id: 4,
      title: 'Update',
      activeImage: <ShieldCheck />,
      route: '/dashboard/update',
    },
    {
      id: 5,
      title: 'Logout',
      activeImage: <LogOut />,
      route: '#',
      onClick: handleLogout, // Attach the logout handler
    },
  ];

  return (
    <div className='h-screen p-5 border-2 shadow-sm'>
      <Image
        src={'./logo.svg'}
        alt="Expense Tracker Logo"
        width={160}
        height={100}
      />
      {
        SideNavData.map((data) => (
          <div 
            key={data.id} 
            className={`flex mt-2 gap-2 items-center font-medium text-gray-500 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 ${curr_route == data.route && 'text-primary bg-blue-200'}`}
            onClick={data.onClick ? data.onClick : () => window.location.href = data.route}
          >
            <p>{data.activeImage}</p>
            <h1>{data.title}</h1>
          </div>
        ))
      }
      <div className='fixed bottom-10 flex p-5 gap-2 items-center'>
        <UserButton />
        <div className='text-gray-500 text-wrap'>
          <p>{user?.fullName}</p>
          <p className='text-wrap'>{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
    </div>
  )
}

export default SideNav;
