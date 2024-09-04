"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig'
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema';
import BudgetItem from '../../budgets/_components/BudgetItem';
import CreateExpense from '../_components/CreateExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { EditIcon, TrashIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';

interface BudgetInfo {
  id: number;
  name: string;
  amount: any;
  icon: any;
  createdBy: string;
  totalItem: number;
  totalSpent: number;
}

interface ExpenseList { 
    id: number;
    name: string;
    amount: string;
    budgetId: number | null;
    createdAt: string;
}

function Expense({params}: any) {
    const { user } = useUser();
    const [budgetInfoStore, setBudgetInfoStore] = useState<BudgetInfo>();
    const [expensesList, setExpensesList] = useState<ExpenseList[]>([]);

    const route = useRouter();

    const emailAddress = user?.primaryEmailAddress?.emailAddress;

    if (!emailAddress) {
        console.error("User email is undefined");
        return;
    }

    // useEffect(() => {
    //     user&&getBudgetData()
    // }, [params])

    // Get the particular Budget Info to be able to add expenses under it
    const getBudgetData = async () => {
        const data = await db.select({
            ...getTableColumns(Budgets),
            totalSpent: sql `sum(${Expenses.amount}::numeric)`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(
            and(
                eq(Budgets.createdBy, emailAddress),
                eq(Budgets.id, params.id)
            )
        )
        .groupBy(Budgets.id)

        setBudgetInfoStore(data[0]);
        console.log("BudgetInfo", budgetInfoStore);

        getExpensesItems();
    }

    getBudgetData();

    // get list of expenses in a particular budget
    const getExpensesItems = async () => {
        const data = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id))
            setExpensesList(data);
        }

        const deleteBudget = async () => {
        // First, delete the expenses attached to the budget
        const deleteExpenseInBudget = async () => {
            const data = await db.delete(Expenses)
                .where(eq(Expenses.budgetId, params.id))
                .returning();
        }

        // Await the deletion of expenses before proceeding to delete the budget
        await deleteExpenseInBudget();

        // After expenses are deleted, delete the budget
        const data = await db.delete(Budgets)
            .where(eq(Budgets.id, params.id))
            .returning();

        // Notify the user and navigate to the budgets page
        toast('Expense Deleted!');
        route.replace('/dashboard/budgets');
    }

  return (
    <div className='p-10'> 
        <h1 className='text-3xl font-bold flex justify-between items-center'>My Expenses
            {/* Edit Budget Button */}
            <div className='flex gap-2 items-center'>
                <EditBudget budget={budgetInfoStore} refreshData={() => getBudgetData()}/>
            
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button className='flex gap-2' variant={"destructive"}><TrashIcon/> Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this partuclar Budget and the expenses attached
                            and remove your data from our servers.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
            {
                budgetInfoStore ? (
                    <BudgetItem budget={budgetInfoStore}/>
                ) : (
                    <div className='w-full h-[180px] rounded-lg bg-slate-200 animate-pulse'/>
                )
            }
            <CreateExpense budgetId={params.id} refreshData={() => getBudgetData()}/>
        </div>

        <div className='mt-5'>
            <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetData()}/>
        </div>
    </div>
  )
}

export default Expense
