"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"

import { FadeLoader } from "react-spinners"
import { InvoiceDataTable } from "@/components/paginationTable/InvoiceDataTable"
import { ShipmentColumn } from "./_table/ShipmentColumn"
import { ShipmentType } from "@/types/type"

export default function InvoicePage() {
  const [shipments, setShipments] = useState<ShipmentType[]>([])
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
        const res = await fetch("/api/checkout", {
          method: "GET",
        })
        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data for shipments!",
          })
        }
        const data = await res.json()
        console.log({ dataInShipment: data })
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
  const handleCreateGHN_Order = async (shipment_id: string) => {
    try {
      const res = await fetch("/api/invoices/shipments/" + shipment_id, {
        method: "POST",
      })
      const data = await res.json()
      console.log({ data })
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: data.message,
        })
      }
      toast({
        variant: "sucess",
        title: data.message,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong with create GHN order shipments!",
      })
    }
  }
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
      {!loading && shipments && (
        <InvoiceDataTable
          columns={ShipmentColumn({
            shipments,
            handleCreateGHN_Order,
          })}
          data={shipments}
        />
      )}
    </div>
  )
}
