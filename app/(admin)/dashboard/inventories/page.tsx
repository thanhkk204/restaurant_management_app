"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/paginationTable/DataTable"
import { toast } from "@/components/ui/use-toast"
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"

import { FadeLoader } from "react-spinners"
import { DishColumn } from "./_table/DishColumn"

export type DishType = {
  _id: string,
  title: string,
  image: string[],
  price: number,
  desc: string,
  isShow: boolean,
  category_id: string,
  collection_ids: string[]
}
export default function DishPage() {
  const [dishes, setDishes] = useState<DishType[] | undefined>(
    undefined
  )
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // Get values were passed in context
  const value = useDashBoardContext()
  if (!value) return
  const { sideBarColor } = value

  // const {data, loading, error} = useGetData<DishType[]>('/api/inventories/dishes')
  useEffect(() => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/inventories/dishes", {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data!",
          })
        }
        const data: DishType[] = await res.json()
        setDishes(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all dishes!",
        })
      }
    }
    fetData()
  }, [])
  // Add
  const handleAddCollection = () => {
    router.push("/dashboard/inventories/add")
  }
  const handleUpdateCollection = (id: string) => {
    router.push("/dashboard/inventories/" + id)
  }
  // Delete
  const handleDeleteCollection = async (IdsArray: string[]) => {
    //  There are two way to delete rows, 1: at DataTable component will task delete selected rows, 2: at Column component will task delete specific row
    // All will be converted to string ids array
    if (IdsArray.length <= 0) {
      toast({
        variant: "destructive",
        title: "There is no selected item",
      })
      return
    }
    try {
      const res = await fetch("/api/inventories/dishes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(IdsArray),
      })
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't delete any dishes",
        })
      }
      toast({
        variant: "sucess",
        title: "Successfully!",
      })
      const newDishes: DishType[] | undefined = dishes?.filter(
        (item) => !IdsArray.includes(item._id)
      )
      setDishes(newDishes)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something wrong with delete dishes",
      })
    }
  }
  return (
    <section>
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <FadeLoader
            color={sideBarColor ? sideBarColor : "#11cdef"}
            loading={loading}
          />
        </div>
      )}
      {dishes && (
        <DataTable
          columns={DishColumn({
            handleDeleteCollection,
            handleUpdateCollection,
          })}
          data={dishes}
          onDelete={handleDeleteCollection}
          onAdd={handleAddCollection}
        />
      )}
    </section>
  )
}

