"use client"
import { DataTable } from '@/components/paginationTable/DataTable'
import { useGetData } from '@/hooks/useGetdata'
import React, { useEffect, useState } from 'react'
import { CollectionColumn} from './_table/CollectionColumn'
import { toast } from '@/components/ui/use-toast'


export type CollectionType = {
  _id: string,
  title: string,
  image: string,
  desc: string,
  isShow: boolean,
}
export default function CollectionsPage() {
  const [collections, setCollections] = useState<CollectionType[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  // const {data, loading, error} = useGetData<CollectionType[]>('/api/inventories/collections')
  useEffect(()=>{
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/inventories/collections', {
          method: "GET",
        })
        
        if(!res.ok) {
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
          title: "Something wrong with add new collection!",
        })
      }
    }
    fetData()
  },[])

  const handleDeleteCollection = async (IdsArray: string[])=>{
    //  There are two way to delete rows, 1: at DataTable component will task delete selected rows, 2: at Column component will task delete specific row
    // All will be converted to string ids array
     try {
     const res = await fetch('/api/inventories/collections', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(IdsArray)
      })
      if(!res.ok){
        toast({
          variant: "destructive",
          title: "Can't delete Collection",
        })
      }
      toast({
        title: "Successfully!",
      })
      const newCollections: (CollectionType[] | undefined) = collections?.filter(item=> !IdsArray.includes(item._id))
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
    {
    loading && <div>Loading</div>
    }
    {
     collections && <DataTable columns={CollectionColumn({handleDeleteCollection})} data={collections} onDelete={handleDeleteCollection}/>
    }
  </section>
  )
}
