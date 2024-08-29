"use client"
import { useState } from 'react';
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
import EmojiPicker from "emoji-picker-react"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';

const CreateNewBudget = ({ refreshData }:any) => {
  const [currentemoji, setCurrentEmoji] =  useState<string>('😂');
  const [openemojipicker, setOpenEmojiPicker] =useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState('');

  const { user } = useUser();

  const onCreateBudget = async () => {
    const emailAddress = user?.primaryEmailAddress?.emailAddress;
    if (!emailAddress) {
      console.error("User email is undefined");
      return;
    }

    // when user clicks the create budget button, add it to the database
    const data = await db.insert(Budgets).values({
      name: name,
      amount: amount,
      createdBy: emailAddress,
      icon: currentemoji
    }).returning({inserted:Budgets.id})
    
    if (data) {
      refreshData()
      toast("Budget successfully created!")
    }
    setAmount("");
    setName("");
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
            <div className="bg-slate-100 mt-5 p-10 font-bold items-center flex flex-col rounded-md 
            border-dashed border-2 hover:shadow-md cursor-pointer">
              <h2 className="text-3xl">+</h2>
              <h2>Create New Budget</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className='mt-2'>
                  <p className='text-black font-bold my-1'>Budget Amount</p>
                  <Input placeholder='e.g. $200'
                  value={amount}
                  type='number'
                  onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            {/* Dialog Footer */}
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button disabled={!(name&&amount)} onClick={() => onCreateBudget()} className='bg-primary text-white mt-5 w-full'>Create Budget</Button>
              </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateNewBudget
