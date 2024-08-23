"use client"

import CheckCard from "@/components/custom_ui/auth/CheckCard"
import { toast } from "@/components/ui/use-toast"
import { decodeBase64 } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const thanksPage = () => {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, setIsPending] = useState<boolean>(true)
  const {
    orderId,
    requestId,
    amount,
    transId,
    resultCode,
    message,
    extraData,
    ...rest
  } = Object.fromEntries(searchParams.entries())
  const jsonString = decodeBase64(extraData)
  const checkout_id = JSON.parse(jsonString).checkout_id

  const UpdateReservation = async (token: string)=>{
    try {
     setIsPending(true)
     const res = await fetch('/api/checkout',{
       method: "PUT",
       body: JSON.stringify({checkout_id, amount})
      })
      if(!res.ok) toast({
       variant: 'destructive',
       title: "Can't update your reservation"
      })
      const data = await res.json()
      if(data) data.success ? setSuccess(data.success) : setError(data.error)
       setIsPending(false)
   } catch (error) {
      setIsPending(false)
     return toast({
       variant: 'destructive',
       title: 'Something wrong while updating your reservation'
      })
    }
}

 useEffect(()=>{
   if(checkout_id){
    UpdateReservation(checkout_id)
   } 
 },[orderId, amount])
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
    <CheckCard
    title="Thanks Sponsor"
    error={error}
    success={success}
    message={error ? error : success}
    link="/"
    linkDisplay="home"
    isPending={isPending}
    />
  </section>
  )
}

export default thanksPage