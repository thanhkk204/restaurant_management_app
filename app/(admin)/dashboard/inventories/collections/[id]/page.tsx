"use client"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { FadeLoader } from "react-spinners"

import { CollectionType } from "../page"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"
import CollectionForm from "@/components/custom_ui/CollectionForm"
export default function UpdateCollection({
  params,
}: {
  params: { id: string }
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<CollectionType | null>(null)
  const { id } = params

  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor } = value
  useEffect(() => {
    if (!id) return

    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/inventories/collections/" + id, {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data for collection detail!",
          })
        }
        const data = (await res.json()) as CollectionType
        setCollection(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get collection detail!",
        })
      }
    }
    fetData()
  }, [id])
  return (
    <section className="min-h-screen md:min-h-fit px-3 md:px-5 py-4 md:py-6">
      <div className="w-full lg:max-w-[50%]">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <FadeLoader
              color={sideBarColor ? sideBarColor : "#11cdef"}
              loading={loading}
            />
          </div>
        )}
        {collection && <CollectionForm collection={collection} />}
      </div>
    </section>
  )
}
