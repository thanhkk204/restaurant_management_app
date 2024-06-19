"use client"
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { CollectionType } from '../page'
import CollectionForm from '@/components/custom_ui/collections/CollectionForm'


export default function UpdateCollection({ params }: { params: { id: string }}) {
    const [loading, setLoading] = useState<boolean>(false)
    const [collection, setCollection] = useState<CollectionType | null>(null)
    const {id} = params
    useEffect(()=>{
        if(!id) return

        const fetData = async () => {
            setLoading(true)
            try {
              const res = await fetch('/api/inventories/collections/'+id, {
                method: "GET",
              })
              
              if(!res.ok) {
                toast({
                  variant: "destructive",
                  title: "Can't get any data!",
                })
              }
              const data = await res.json() as CollectionType
              setCollection(data)
              setLoading(false)
            } catch (error) {
              setLoading(false)
              toast({
                variant: "destructive",
                title: "Something wrong with add new collection!",
              })
            }
          }
          fetData()
    },[id])
   return (
    <section className="min-h-screen md:min-h-fit px-3 md:px-5 py-4 md:py-6">
      <div className="w-full lg:max-w-[50%]">
       {
        collection &&  <CollectionForm collection={collection}/>
       }
      </div>
    </section>
   )
}
