import { Trash2Icon } from "lucide-react";
import { db } from '@/utils/dbConfig';
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ExpenseList { 
  id: number;
  name: string;
  amount: string;
  budgetId?: number | null;
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
    <div className='mt-4'>
      {/* ShadCN Table UI */}
      <h2 className='font-bold text-lg mt-2'>Recent Expenses</h2>
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader className="bg-slate-200 font-bold">
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-slate-50 font-medium">
          {expensesList.map((expense, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell>${expense?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
              <TableCell>{expense.createdAt}</TableCell>
              <TableCell className="text-right">
                <Trash2Icon onClick={() => deleteExpense(expense)} className="text-red-600 cursor-pointer"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ExpenseListTable
