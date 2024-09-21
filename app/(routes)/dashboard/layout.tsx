"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function DashboardLayout({children}: any) {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    user&&isBudgetCreated();
  }, [user])

  const isBudgetCreated = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      console.error("User email is undefined");
      return null;
    }

    const data = await db.select().from(Budgets)
    .where(eq(Budgets.createdBy, email))

    if (data?.length == 0) {
      router.replace('/dashboard/budgets')
    }
  }
  return (
    <div>
        <div className='fixed md:w-72 hidden md:block text-wrap'>
          <SideNav/>
        </div>

        <div className='md:ml-72'>
          <DashboardHeader/>
          {children}
        </div>
    </div>
  )
}

export default DashboardLayout;