"use client"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { FadeLoader } from "react-spinners"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"

import { CategoryType } from "../page"
import CategoryForm from "@/components/custom_ui/CategoryForm"
export default function UpdateCategory({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [category, setCategory] = useState<CategoryType | null>(null)
  const { id } = params

  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor } = value
  useEffect(() => {
    if (!id) return

    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/inventories/categories/" + id, {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data for category detail!",
          })
        }
        const data = (await res.json()) as CategoryType
        setCategory(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get category detail!",
        })
      }
    }
    fetData()
  }, [id])
  return (
    <div className="min-h-screen md:min-h-fit px-3 md:px-5 py-4 md:py-6">
      <div className="w-full lg:max-w-[50%]">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <FadeLoader
              color={sideBarColor ? sideBarColor : "#11cdef"}
              loading={loading}
            />
          </div>
        )}
        {category && <CategoryForm category={category} />}
      </div>
    </div>
  )
}
