"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/paginationTable/DataTable"
import { toast } from "@/components/ui/use-toast"
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"

import { FadeLoader } from "react-spinners"
import { useGetData } from "@/hooks/useGetdata"
import { ReservationType } from "@/lib/constants/type"
import { ReservationColumn } from "./_table/ReservationColumn"
import { InvoiceDataTable } from "@/components/paginationTable/InvoiceDataTable"


export default function InvoicePage() {
  const [reservations, setReservations] = useState<ReservationType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // Get values were passed in context
  const value = useDashBoardContext()
  if (!value) return
  const { sideBarColor } = value
// Get All reservation
  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations", {
          method: "GET",
        })
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
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all reservations!",
        })
      }
    }
    fetData()
  }, [])
  // Fetch categories and collections for dish form and table
  // useEffect(() => {
  //   const fetCollecttions = async () => {
  //     setLoading(true)
  //     try {
  //       const res = await fetch("/api/inventories/collections", {
  //         method: "GET",
  //       })

  //       if (!res.ok) {
  //         toast({
  //           variant: "destructive",
  //           title: "Can't get any data!",
  //         })
  //       }
  //       const data: CollectionType[] = await res.json()
  //       setCollections(data)
  //       setLoading(false)
  //     } catch (error) {
  //       setLoading(false)
  //       toast({
  //         variant: "destructive",
  //         title: "Something wrong with get all collection!",
  //       })
  //     }
  //   }
  //   fetCollecttions()
  //   const fetCategories = async () => {
  //     setLoading(true)
  //     try {
  //       const res = await fetch("/api/inventories/categories", {
  //         method: "GET",
  //       })

  //       if (!res.ok) {
  //         toast({
  //           variant: "destructive",
  //           title: "Can't get any data!",
  //         })
  //       }
  //       const data: CategoryType[] = await res.json()
  //       setCategories(data)
  //       setLoading(false)
  //     } catch (error) {
  //       console.log(error)

  //       setLoading(false)
  //       toast({
  //         variant: "destructive",
  //         title: "Something wrong with get all category!",
  //       })
  //     }
  //   }
  //   fetCategories()
  // }, [])
  // Add
  // Delete
  return (
    <section>
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
            reservations
          })}
          data={reservations}
        />
      )}
    </section>
  )
}

