import { Trash2Icon } from "lucide-react";
import { db } from '@/utils/dbConfig';
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

interface ExpenseList { 
    id: number;
    name: string;
    amount: string;
    budgetId: number | null;
    createdAt: string;
}

type ExpenseTableProps = {
    expensesList: ExpenseList[];
    refreshData: () => any
}

function ExpenseListTable({expensesList, refreshData}: ExpenseTableProps) {
  // delete an expense
  const deleteExpense = async (expense: any) => {
    const data = await db.delete(Expenses)
    .where(eq(Expenses.id, expense.id))
    .returning();

    if (data) {
      toast('Expense Deleted!')
      refreshData();
    }
  }
  return (
    <div className='mt-3'>
      <div className='grid grid-cols-4 p-3 bg-slate-200 font-bold'>
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>

      {
        expensesList.map((expense, index) => (
          <div className='grid grid-cols-4 p-3 bg-slate-50 font-medium'>
              <h2>{expense.name}</h2>
              <h2>${expense.amount}</h2>
              <h2>{expense.createdAt}</h2>
              <h2>
                  <Trash2Icon onClick={() => deleteExpense(expense)} className="text-red-600 cursor-pointer"/>
              </h2>
          </div> 
        ))
      }
    </div>
  )
}

export default ExpenseListTable
