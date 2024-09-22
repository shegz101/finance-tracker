"use client"
import Image from 'next/image';
import Logo from '../../public/logo.svg'
import { Button } from '@/components/ui/button';
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Header: React.FC = () => {
  const { isSignedIn } = useUser();
  return (
    <div className='p-3 md:p-5 flex justify-between items-center border-b-2 shadow-sm'>
      <Image
      src={Logo}
      alt="Expense Tracker Logo"
      width={160}
      height={100}
      />
      {
        isSignedIn ? (<UserButton/>) : (
          <Link href={'/sign-up'}>
            <Button variant={"default"}>Get Started</Button>
          </Link>
        )
      }
    </div>
  );
}

export default Header;