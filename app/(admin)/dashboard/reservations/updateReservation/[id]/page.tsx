"use client"
import ReservationForm from '@/components/custom_ui/ReservationForm';
import { toast } from '@/components/ui/use-toast';
import { ReservationType } from '@/lib/constants/type';
import { useDashBoardContext } from '@/lib/context/DashboardContextProvider';
import React, { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners';



export default function CreateReservation({params}: {params: {id:string}}) {
  const {id: table_id} = params
  const [reservation, setReservation]= useState<ReservationType>()
  const [loading, setLoading] = useState<boolean>(false)

    // Get values were passed in context
    const value = useDashBoardContext()
    if (!value) return
    const { sideBarColor } = value

  useEffect(()=>{
    const fetData = async ()=>{
      setLoading(true)
    try {
      const res = await fetch('/api/reservations/seatedReservation/'+table_id, {
        method: "GET",
      })
      if (!res.ok) return
      const data = await res.json()
      const reser = data.reservationDetail as ReservationType
      setReservation(reser)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something wrong with get detail reservation!",
      })
    }
    }
    fetData()
  },[table_id])
  return (
    <section className="relative flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
        <div className="w-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md flex justify-start">
          <div className='w-full lg:w-1/2 px-3 py-4 md:px-6 md:py-6'>
          {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <FadeLoader
            color={sideBarColor ? sideBarColor : "#11cdef"}
            loading={loading}
          />
        </div>
      )}
           {
            reservation && !loading && <ReservationForm reservation={reservation} table_id={table_id}/> 
           }
          </div>
        </div>
      </section>
  )
}
