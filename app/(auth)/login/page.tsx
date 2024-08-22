import AuthCard from '@/components/custom_ui/auth/AuthCard'
import LoginForm from '@/components/custom_ui/auth/LoginForm'
import SocialCard from '@/components/custom_ui/auth/SocialCard'
import React from 'react'

export default function LoginPage() {
  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
        <AuthCard
        SocialCard={<SocialCard/>}
        link={"/register"}
        linkTitle={"Sign up"}
        >
         <LoginForm/>
        </AuthCard>
    </section>
  )
}
