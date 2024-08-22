import AuthCard from '@/components/custom_ui/auth/AuthCard'
import RegisterForm from '@/components/custom_ui/auth/RegisterForm'
import SocialCard from '@/components/custom_ui/auth/SocialCard'
import React from 'react'

export default function page() {
  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
        <AuthCard
           SocialCard={<SocialCard/>}
           link={"/login"}
           linkTitle={"Sign in"}
        >
          <RegisterForm/>
        </AuthCard>
    </section>
  )
}
