"use client"
import CheckCard from "@/components/custom_ui/auth/CheckCard"
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState, useTransition } from "react";

export default function VerificationToken({ searchParams }: { searchParams: { [key: string]: string } }) {
  const token = searchParams.token;

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, setIsPending] = useState<boolean>(true)

 const VerificationToken = async (token: string)=>{
     try {
      setIsPending(true)
      const res = await fetch('/api/verificationToken',{
        method: "POST",
        body: JSON.stringify({token})
       })
       if(!res.ok) toast({
        variant: 'destructive',
        title: "Can't verify your token"
       })
       const data = await res.json()
       if(data) data.success ? setSuccess(data.success) : setError(data.error)
        setIsPending(false)
    } catch (error) {
       setIsPending(false)
      return toast({
        variant: 'destructive',
        title: 'Something wrong while verification your token'
       })
     }
 }

  useEffect(()=>{
    if(token){
        VerificationToken(token)
    } 
  },[token])
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <CheckCard
      title="Verification Email"
      error={error}
      success={success}
      message={error ? error : success}
      link="/login"
      linkDisplay="login"
      isPending={isPending}
      />
    </section>
  )
}
