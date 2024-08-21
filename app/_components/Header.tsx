import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <div className='p-5 flex justify-between items-center border-b-2 shadow-sm'>
      <Image
      src={'./logo.svg'}
      alt="Expense Tracker Logo"
      width={160}
      height={100}
      />
      <Button variant={"default"}>Get Started</Button>
    </div>
  );
}

export default Header;