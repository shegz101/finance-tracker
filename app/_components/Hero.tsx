"use client"
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import TypeWriter from "../(routes)/dashboard/_components/TypeWriter";

const Hero: React.FC = () => {
    const { isSignedIn } = useUser();
    // const router = useRouter();

    // const isSign = () => {
    //     if (isSignedIn) {
    //         router.replace('/dashboard')
    //     }
    // }

    // isSign();
  return (
    <section className="bg-gray-50 flex items-center flex-col">
        <div className="mx-auto max-w-screen-xl px-5 py-32 lg:flex">
            <div className="mx-auto max-w-xl text-center">

                <h1 className="text-3xl font-extrabold sm:text-5xl">
                    <TypeWriter text="Manage Your Expenses" styling="text-3xl font-extrabold sm:text-5xl"/>
                    <strong className="font-extrabold text-primary sm:block"> Control your Spending </strong>
                </h1>

                <p className="mt-4 sm:text-xl/relaxed">
                    Create a budget and track expenses related to it!
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {
                        isSignedIn ? <p style={{display:"none"}}>Already Signed In</p> : (
                            <a
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue focus:outline-none focus:ring active:bg-blue-600 sm:w-auto"
                            href="/sign-up"
                            >
                                Get Started
                            </a>
                        )
                    }
                </div>
            </div>
        </div>
        <Image
        src={'/dashboard.jpg'}
        alt="Dashboard Image"
        width={1000}
        height={700}
        className='-mt-9 rounded-xl border-2'
        />
    </section>
  )
}

export default Hero