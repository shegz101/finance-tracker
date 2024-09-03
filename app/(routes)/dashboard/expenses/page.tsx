"use client"
import React, { useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Expenses, Budgets } from "@/utils/schema";
import { useUser } from '@clerk/nextjs'

type BudgetItem = {
  totalSpent: number;
  totalItem: number;
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
};

type ExpenseItem = {
  id: number;
  name: string;
  amount: string;
  createdAt: string;
};

function page() {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [allExpenses, setAllExpenses] = useState<ExpenseItem[]>([])

  const { user } = useUser();

  const emailAddress = user?.primaryEmailAddress?.emailAddress;
  
  if (!user) {
    console.error("User is not undefined");
    return;
  }

  if (!emailAddress) {
    console.error("User email is undefined");
    return;
  }

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
      getAllExpenses();

    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  getBudgets();

  const recentBudgets = [budgetItems[0], budgetItems[1]];

  // Get all expenses for a user
  const getAllExpenses = async () => {
    const data = await db.select({
      id: Expenses.id,
      name:Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, emailAddress))
    .orderBy(desc(Expenses.id))

    setAllExpenses(data);
    console.log(data);
  }

  return (
    <div className='mt-3 p-5'>
      <h2 className='font-bold text-lg'>My Expenses</h2>
      <p className='text-gray-500 mb-3'>Here is an Overview of your Expenses</p>

      <div className='border-2 shadow-md rounded-lg p-3'>
        <ExpenseListTable expensesList={allExpenses} refreshData={() => getAllExpenses}/>
      </div>
    </div>
  )
}

export default page
