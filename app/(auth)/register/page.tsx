import AuthCard from '@/components/custom_ui/auth/AuthCard'
import RegisterForm from '@/components/custom_ui/auth/RegisterForm'
import React from 'react'

export default function page() {
  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
        <AuthCard>
          <RegisterForm/>
        </AuthCard>
    </section>
  )
}
