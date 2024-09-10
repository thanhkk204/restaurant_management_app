"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"

import { FadeLoader } from "react-spinners"
import { ReservationColumn } from "./_table/ReservationColumn"
import { InvoiceDataTable } from "@/components/paginationTable/InvoiceDataTable"
import { ReservationType } from "@/types/type"

export default function InvoicePage() {
  const [reservations, setReservations] = useState<ReservationType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor } = value
  // Get All reservation
  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations", {
          method: "GET",
        })
        console.log({res})
        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't get any data for reservations!",
          })
        }
        const data = await res.json()
        setReservations(data.reservations)
        setLoading(false)
      } catch (error) {
        console.log({error})
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all reservations!",
        })
      }
    }
    fetData()
  }, [])
  return (
    <div>
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <FadeLoader
            color={sideBarColor ? sideBarColor : "#11cdef"}
            loading={loading}
          />
        </div>
      )}
      {!loading && reservations && (
        <InvoiceDataTable
          columns={ReservationColumn({
            reservations,
          })}
          data={reservations}
        />
      )}
    </div>
  )
}
