"use client"
import React, { useEffect,useState } from 'react'
import { PiggyBank, ReceiptCent, WalletCards } from 'lucide-react';

type BudgetItem = {
  totalSpent: number;
  totalItem: number;
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
};

interface CardItemProps {
    budgetItem: BudgetItem[]
}

function CardItem({ budgetItem }: CardItemProps) {
    const [totalSpent, setTotalSpent] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0)
    const getRequiredItems = () => {
        let totalAmounts = 0
        let totalSpents = 0

        budgetItem.forEach((budget) => {
            totalAmounts = totalAmounts + Number(budget?.amount);
            totalSpents = totalSpents + budget?.totalSpent;
        })

        setTotalAmount(totalAmounts);
        setTotalSpent(totalSpents)
    }

    useEffect(() => {
        budgetItem&&getRequiredItems()
    }, [budgetItem])

    // function formatNumberWithCommas(number: number) {
    //     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

  return (
    <div>
      {
        budgetItem?.length > 0 ? (
            <div className='mt-6 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                <div className='flex justify-between items-center p-4 border rounded-lg shadow-md gap-2'>
                    <div className=''>
                        <h2 className='text-sm text-slate-500'>Total Amount</h2>
                        <h2 className='font-bold text-3xl'>${totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                    </div>
                    <PiggyBank className='bg-primary rounded-full text-white p-3 h-12 w-12'/>
                </div>

                <div className='flex justify-between items-center p-4 border rounded-lg shadow-md gap-2'>
                    <div className=''>
                        <h2 className='text-sm text-slate-500'>Total Spent</h2>
                        <h2 className='font-bold text-3xl'>${totalSpent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h2>
                    </div>
                    <ReceiptCent className='bg-primary rounded-full text-white p-3 h-12 w-12'/>
                </div>

                <div className='flex justify-between items-center p-4 border rounded-lg shadow-md gap-2'>
                    <div className=''>
                        <h2 className='text-sm text-slate-500'>Total Budgets Created</h2>
                        <h2 className='font-bold text-3xl'>{budgetItem?.length}</h2>
                    </div>
                    <WalletCards className='bg-primary rounded-full text-white p-3 h-12 w-12'/>
                </div>
            </div>
        ) : (
            <div className='mt-6 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    [1,2,3].map((num, index) => (
                        <div key={index} className='w-full h-[110px] rounded-lg bg-slate-200 animate-pulse'/>
                    ))
                }
            </div>
        )
      }
      
    </div>
  )
}

export default CardItem
