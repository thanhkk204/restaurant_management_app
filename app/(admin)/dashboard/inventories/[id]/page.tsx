"use client"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { FadeLoader } from "react-spinners"

import { useThemeContext } from "@/lib/context/ThemeContextProvider"
import { DishType } from "../page"
import DishForm from "@/components/custom_ui/DishForm"
export default function UpdateDish({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [dish, setDish] = useState<DishType | null>(null)
  const { id } = params
  console.log(dish)

  // Get values were passed in context
  const value = useThemeContext()
  if (!value) return
  const { sideBarColor } = value
  useEffect(() => {
    if (!id) return

    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/inventories/dishes/" + id, {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data for dish detail!",
          })
        }
        const data = (await res.json()) as DishType
        setDish(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get dish detail!",
        })
      }
    }
    fetData()
  }, [id])
  return (
    <section className="min-h-screen md:min-h-fit px-3 md:px-5 py-4 md:py-6">
      <div className="w-full lg:max-w-[50%]">
        {loading && (
          <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
            <FadeLoader
              color={sideBarColor ? sideBarColor : "#11cdef"}
              loading={loading}
            />
          </div>
        )}
        {dish && <DishForm dish={dish} />}
      </div>
    </section>
  )
}
