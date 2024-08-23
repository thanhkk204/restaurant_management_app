import React, { ReactNode } from 'react'
import SocialCard from './SocialCard'
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DotLoader } from 'react-spinners';
type Props = {
  title: string,
  link: string,
  linkDisplay: string,
  message: string  | undefined,
  error?: string | undefined,
  success?: string | undefined,
  isPending?: boolean
}
export default function CheckCard({error, success, isPending , link , linkDisplay, title, message}: Props) {
  return (
    <div className='min-w-[400px] max-w-[500px] px-3 py-4 md:px-5 md:py-6 rounded-md shadow-lg bg-light-bg_2 dark:bg-dark-bg_2 flex flex-col items-center'>
      <div className='flex gap-1 items-center justify-center'>
        <Image 
        src={'/images/lock.png'}
        alt='lock image'
        width={50}
        height={50}
        />
        <h1 className='text-light-text dark:text-dark-text text-3xl font-bold'>Auth</h1>
      </div>

      <div>
        <p className='text-light-textSoft dark:text-dark-textSoft text py-2'>{title}</p>
      </div>
      
      {
        isPending ? (
        <DotLoader
          color={"#11cdef"}
          loading={isPending}
        />
        ) : (
       <div className={cn(
          "w-full flex items-center justify-center gap-2 px-3 py-3 rounded-sm text-white my-4",
          error ? 'bg-red-400' : 'bg-green-400 '
        )}>
          {
            error && <ShieldAlert/>
          }
          {
            success && <BadgeCheck/>
          }
          <p>{message}</p>
        </div>
        )
      }
      <div className='text-light-text dark:text-dark-text'>Get back to <Link href={link} className='text-blue-1'>{linkDisplay}!</Link></div>
      
    </div>
  )
}
