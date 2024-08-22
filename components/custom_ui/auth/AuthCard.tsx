"use client"
import Image from 'next/image'
import React, { ReactNode } from 'react'
import SocialCard from './SocialCard'
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {
  children: ReactNode
  SocialCard?: ReactNode
  link: string
  linkTitle: string
}

const AuthCard = ({children, SocialCard, link, linkTitle}: Props) => {
  return (
    <div className='min-w-[400px] max-w-[500px] px-3 py-2 md:px-5 md:py-4 rounded-md shadow-lg bg-light-bg_2 dark:bg-dark-bg_2 flex flex-col items-center'>
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
        <p className='text-light-textSoft dark:text-dark-textSoft text py-2'>Welcome back</p>
      </div>

      <div className='w-full'>
        {children}
      </div>

      {SocialCard}

      <div className="w-full text-center leading-7 pt-4 text-light-text dark:text-dark-text">
          Don't you have account ? <Button className='px-0' variant={"link"}><Link href={link || '/'} className="text-blue-1 mt-0">{linkTitle}</Link></Button>
        </div>
      
    </div>
  )
}

export default AuthCard