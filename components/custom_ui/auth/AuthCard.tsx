"use client"
import Image from 'next/image'
import React, { ReactNode } from 'react'
import SocialCard from './SocialCard'
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react'

const AuthCard = ({children}: {children: ReactNode}) => {
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

      <div className='w-full flex items-center gap-5 pt-5'>
        <div className='flex-1' onClick={() => signIn("google", { redirectTo: "/" })}>
        <SocialCard 
         icons={<FcGoogle className='text-[25px]'/>}
        />
        </div>
        <div className='flex-1' onClick={() => signIn("github", { redirectTo: "/" })}>
        <SocialCard 
        icons={<FaGithub className='text-[25px]  dark:text-white'/>}
        />
        </div>
      </div>
      
    </div>
  )
}

export default AuthCard