"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/paginationTable/DataTable"
import { toast } from "@/components/ui/use-toast"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"

import { FadeLoader } from "react-spinners"
import { DishColumn } from "./_table/DishColumn"
import { CategoryType } from "./categories/page"
import { CollectionType } from "./collections/page"
import { useGetData } from "@/hooks/useGetdata"

export type DishType = {
  _id: string
  title: string
  image: string[]
  price: number
  desc: string
  isShow: boolean
  category_id: string
  collection_ids: string[]
}
export default function DishPage() {
  const [dishes, setDishes] = useState<DishType[] | undefined>(undefined)
  const [collections, setCollections] = useState<CollectionType[] | null>(null)
  const [categories, setCategories] = useState<CategoryType[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor } = value

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
  // Fetch categories and collections for dish form and table
  useEffect(() => {
    const fetCollecttions = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/inventories/collections", {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data!",
          })
        }
        const data: CollectionType[] = await res.json()
        setCollections(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all collection!",
        })
      }
    }
    fetCollecttions()
    const fetCategories = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/inventories/categories", {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data!",
          })
        }
        const data: CategoryType[] = await res.json()
        setCategories(data)
        setLoading(false)
      } catch (error) {
        console.log(error)

        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all category!",
        })
      }
    }
    fetCategories()
  }, [])
  // Add
  const handleAddDish = () => {
    router.push("/dashboard/inventories/add")
  }
  const handleUpdateDish = (id: string) => {
    router.push("/dashboard/inventories/" + id)
  }
  // Delete
  const handleDeleteDishes = async (IdsArray: string[]) => {
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
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <FadeLoader
            color={sideBarColor ? sideBarColor : "#11cdef"}
            loading={loading}
          />
        </div>
      )}
      {!loading && dishes && categories && collections && (
        <DataTable
          columns={DishColumn({
            handleDeleteDishes,
            handleUpdateDish,
            categories,
            collections,
          })}
          data={dishes}
          onDelete={handleDeleteDishes}
          onAdd={handleAddDish}
        />
      )}
    </section>
  )
}
