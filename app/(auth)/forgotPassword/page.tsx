import AuthCard from '@/components/custom_ui/auth/AuthCard'
import ResetPasswordForm from '@/components/custom_ui/auth/ResetPasswordForm'
import React from 'react'

export default function ForgotPasswordPage() {
  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
    <AuthCard
    link={"/login"}
    linkTitle={"Sign in"}
    >
     <ResetPasswordForm/>
    </AuthCard>
</section>
  )
}
