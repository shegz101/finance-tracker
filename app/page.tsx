"use client"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const isSign = () => {
      if (isSignedIn) {
          router.replace('/dashboard/budgets')
      }
  }

  isSign();
  return (
    <div>
      <Header/>
      <Hero/>
    </div>
  );
}
