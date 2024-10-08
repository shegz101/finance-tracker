import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from "@/utils/schema";
import { toast } from "sonner"
import moment from "moment";
import { Loader } from "lucide-react";

type ExpenseItemId = {
  budgetId: any; // This should match the type of each item in budgetItems
  refreshData: () => any
};

function CreateExpense({ budgetId, refreshData }: ExpenseItemId) {
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

    const onCreateExpense = async () => {
      try {
        setLoading(true);

        // Add the expense to the database
        const data = await db.insert(Expenses).values({
          name: name,
          amount: amount,
          budgetId: budgetId,
          createdAt: moment().format('DD/MM/YYYY')
        }).returning({ inserted: Budgets.id });

        if (data) {
          refreshData();
          setLoading(false);
          toast("Expense successfully created!");
        }
        setLoading(false);

        // Reset the input fields after successful submission
        setAmount("");
        setName("");

        console.log(data);
      } catch (error: any) {
        // Handle any errors that occur during the process
        toast(error.message || "An error occurred while creating the expense");
      }
    };

  return (
    <div className="p-5 border rounded-lg">
        <h1 className='text-lg font-bold'>Create Expense</h1>

        <div className='mt-2'>
            <h1 className='text-black font-bold my-1'>Expense Name</h1>
            <Input placeholder='e.g. Work Gadgets'
            value={name}
            onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className='mt-2'>
            <p className='text-black font-bold my-1'>Expense Amount</p>
            <Input placeholder='e.g. $500'
            value={amount}
            type='number'
            onChange={(e) => setAmount(e.target.value)}
            />
        </div>

        <Button disabled={!(name&&amount)||loading} onClick={() => onCreateExpense()} className='bg-primary text-white mt-3 w-full'>
          {
            loading ? <Loader className="animate-spin"/> : "Create Expenses"
          }
        </Button>
    </div>
  )
}

export default CreateExpense;
