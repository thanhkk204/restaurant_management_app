"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"

import { FadeLoader } from "react-spinners"
import { ShipmentType } from "@/lib/constants/type"
import { InvoiceDataTable } from "@/components/paginationTable/InvoiceDataTable"
import { ShipmentColumn } from "./_table/ShipmentColumn"


export default function InvoicePage() {
  const [shipments, setShipments] = useState<ShipmentType[]>([])
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
        const res = await fetch("/api/invoices/shipments", {
          method: "GET",
        })
        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't get any data for shipments!",
          })
        }
        const data = await res.json()
        setShipments(data.shipments)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all shipments!",
        })
      }
    }
    fetData()
  }, [])
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
      {!loading && shipments && (
        <InvoiceDataTable
          columns={ShipmentColumn({
            shipments
          })}
          data={shipments}
        />
      )}
    </section>
  )
}

