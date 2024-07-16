"use client"
import ReservationForm from "@/components/custom_ui/ReservationForm"
import { toast } from "@/components/ui/use-toast"
import { ReservationType } from "@/lib/constants/type"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"
import React, { useEffect, useState } from "react"
import { FadeLoader } from "react-spinners"
import { TableType } from "../../page"

export default function CreateReservation({
  params,
}: {
  params: { id: string }
}) {
  const { id: table_id } = params
  const [loading, setLoading] = useState<boolean>(false)
  const [numberOfSeats, setNumberOfSeats] = useState<number>()

  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor } = value
  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/tables/" + table_id, {
          method: "GET",
        })

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't get table detail!",
          })
        }
        const data = await res.json()
        const table = data.table as TableType
        setNumberOfSeats(table.number_of_seats)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get detail table in create reservation!",
        })
      }
    }
    fetData()
  }, [])
  return (
    <section className="flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
      <div className="w-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md flex justify-start">
        <div className="w-full lg:w-1/2 px-3 py-4 md:px-6 md:py-6">
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <FadeLoader
                color={sideBarColor ? sideBarColor : "#11cdef"}
                loading={loading}
              />
            </div>
          )}
          {!loading && table_id && numberOfSeats && (
            <ReservationForm
              table_id={table_id}
              numberOfSeats={numberOfSeats}
            />
          )}
        </div>
      </div>
    </section>
  )
}
