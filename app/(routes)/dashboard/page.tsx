"use client"
import { useState, useEffect } from "react";
import { UserButton, useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import CardItem from './_components/CardItem';
import { Budgets, Expenses } from "@/utils/schema";
import DashboardBarChart from "./_components/DashboardBarChart";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import TypeWriter from "./_components/TypeWriter";

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
  }

  return (
    <div className='p-5'>
      <TypeWriter text={`Hello, ${user?.fullName} 👋`} styling="font-bold text-3xl"/>
      <p className='text-gray-500'>Here is an Overview of your Budgets and Expenses</p>
      {/* Display the cards */}
      <CardItem budgetItem={budgetItems}/>

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <DashboardBarChart budgetItem={budgetItems}/>

          <ExpenseListTable expensesList={allExpenses} refreshData={() => getAllExpenses}/>
        </div>
        <div className="grid gap-3 h-[200px]">
          <h2 className='font-bold text-lg'>Recent Budgets</h2>
          {
            recentBudgets.map((budgetItem,index) => (
              <BudgetItem budget={budgetItem} key={index}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page
