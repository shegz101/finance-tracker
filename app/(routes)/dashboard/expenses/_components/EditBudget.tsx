"use client"
import { useState } from "react";
import { Button } from '@/components/ui/button'
import { EditIcon } from 'lucide-react'
import EmojiPicker from "emoji-picker-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { db } from '@/utils/dbConfig';
import { Input } from "@/components/ui/input";
import { useUser } from '@clerk/nextjs';
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

interface BudgetInfo {
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
  totalItem: number;
  totalSpent: number | null;
}

interface EditBudgetProps {
    budget: any
    refreshData: () => any
}

function EditBudget({ budget, refreshData }: EditBudgetProps) {
  const [currentemoji, setCurrentEmoji] =  useState<string>(budget?.icon);
  const [openemojipicker, setOpenEmojiPicker] =useState<boolean>(false);
  const [name, setName] = useState<string>(budget?.name);
  const [amount, setAmount] = useState(budget?.amount);

  const { user } = useUser();

  const onEditBudget = async () => {
    const data = await db.update(Budgets).set({
        name: name,
        amount: amount,
        icon: currentemoji
    }).where(eq(Budgets.id, budget.id))
    .returning()

    if (data) {
      refreshData()
      toast("Budget successfully Edited!")
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
            <Button className='bg-primary flex gap-2 items-center'><EditIcon/> Edit</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Budget</DialogTitle>
              <DialogDescription>
                <div className='mt-5'>
                  <Button variant={"outline"} className='text-lg' onClick={() => setOpenEmojiPicker(!openemojipicker)}>{currentemoji}</Button>
                  <div className='mt-2 absolute z-10'>
                    <EmojiPicker
                    open={openemojipicker}
                    onEmojiClick={(e) => {
                      setCurrentEmoji(e.emoji)
                      setOpenEmojiPicker(false)
                    }}
                    />
                  </div>
                </div>
                {/* Input fields */}
                <div className='mt-2'>
                  <h1 className='text-black font-bold my-1'>Budget Name</h1>
                  <Input placeholder='e.g. Home Appliances'
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className='mt-2'>
                  <p className='text-black font-bold my-1'>Budget Amount</p>
                  <Input placeholder='e.g. $200'
                  defaultValue={amount}
                  type='number'
                  onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            {/* Dialog Footer */}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button disabled={!(name&&amount)} onClick={() => onEditBudget()} className='bg-primary text-white mt-5 w-full'>Edit Budget</Button>
              </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget
