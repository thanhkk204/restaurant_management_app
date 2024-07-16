"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/paginationTable/DataTable"
import { toast } from "@/components/ui/use-toast"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"

import { CollectionColumn } from "./_table/CollectionColumn"
import { FadeLoader } from "react-spinners"

export type CollectionType = {
  _id: string
  title: string
  image: string
  desc: string
  isShow: boolean
}
export default function CollectionsPage() {
  const [collections, setCollections] = useState<CollectionType[] | undefined>(
    undefined
  )
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor } = value

  useEffect(() => {
    const fetData = async () => {
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
    fetData()
  }, [])
  // Add
  const handleAddCollection = () => {
    router.push("/dashboard/inventories/collections/add")
  }
  const handleUpdateCollection = (id: string) => {
    router.push("/dashboard/inventories/collections/" + id)
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
      const res = await fetch("/api/inventories/collections", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(IdsArray),
      })
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't delete Collection",
        })
      }
      toast({
        variant: "sucess",
        title: "Successfully!",
      })
      const newCollections: CollectionType[] | undefined = collections?.filter(
        (item) => !IdsArray.includes(item._id)
      )
      setCollections(newCollections)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something wrong with delete Collections",
      })
    }
  }
  return (
    <section>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <FadeLoader
            color={sideBarColor ? sideBarColor : "#11cdef"}
            loading={loading}
          />
        </div>
      )}
      {collections && (
        <DataTable
          columns={CollectionColumn({
            handleDeleteCollection,
            handleUpdateCollection,
          })}
          data={collections}
          onDelete={handleDeleteCollection}
          onAdd={handleAddCollection}
        />
      )}
    </section>
  )
}
