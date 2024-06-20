"use client"
import { DataTable } from "@/components/paginationTable/DataTable"
import React, { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { CategoryColumn } from "./_table/CategoryColumn"
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"
import { FadeLoader } from "react-spinners"

export type CategoryType = {
  _id: string
  title: string
  desc: string
  isShow: boolean
}
export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryType[] | undefined>(
    undefined
  )
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

    // Get values were passed in context
    const value = useDashBoardContext()
    if (!value) return
    const { sideBarColor } = value

  useEffect(() => {
    const fetData = async () => {
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
    fetData()
  }, [])
  // Add
  const handleAddCategory = () => {
    router.push("/dashboard/inventories/categories/add")
  }
  const handleUpdateCategory = (id: string) => {
    router.push("/dashboard/inventories/categories/" + id)
  }
  // Delete
  const handleDeleteCategory = async (IdsArray: string[]) => {
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
      const res = await fetch("/api/inventories/categories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(IdsArray),
      })
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't delete Category",
        })
      }
      toast({
        variant: "sucess",
        title: "Successfully!",
      })
      const newCategories: CategoryType[] | undefined = categories?.filter(
        (item) => !IdsArray.includes(item._id)
      )
      setCategories(newCategories)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something wrong with delete categories",
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
      {categories && (
        <DataTable
          columns={CategoryColumn({
            handleDeleteCategory,
            handleUpdateCategory,
          })}
          data={categories}
          onDelete={handleDeleteCategory}
          onAdd={handleAddCategory}
        />
      )}
    </section>
  )
}
