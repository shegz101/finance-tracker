"use client"
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import CreateNewBudget from './CreateNewBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema';
import BudgetItem from './BudgetItem';

type BudgetItem = {
  totalSpent: number;
  totalItem: number;
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
};

const BudgetsList: React.FC = () => {
  const { user } = useUser();
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);

  const emailAddress = user?.primaryEmailAddress?.emailAddress;

  console.log("email address", emailAddress);

  if (!emailAddress) {
    console.error("User email is undefined");
    return;
  }

  useEffect(() => {
    if (emailAddress) {
      getBudgets();
    }
  }, [emailAddress]);

  // Get the Budget List
  const getBudgets = async () => {
    try {
      const data = await db.select({
        ...getTableColumns(Budgets),
        totalSpent: sql `sum(${Expenses.amount}::numeric)`.mapWith(Number),
        totalItem: sql `count(${Expenses.id})`.mapWith(Number),
      }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))

      setBudgetItems(data);

    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  return (
    <div>
      {emailAddress ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <CreateNewBudget refreshData={() => getBudgets()}/>
          {budgetItems?.length > 0 ? budgetItems.map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          )) : [1,2,3,4,5].map((index, num) => (
            <div key={index} className='w-full h-[180px] rounded-lg bg-slate-200 animate-pulse'/>
          ))}
        </div>
      ) : (
        <p>Error: User email is undefined</p>
      )}
    </div>
  )
}

export default BudgetsList
