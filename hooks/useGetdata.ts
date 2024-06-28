"use client"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

type FetchState<T> = {
  loading: boolean;
  error: any;
  data: T | null;
};

export function useGetData<T = unknown>(url: string): FetchState<T> {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
        })
        if(!res.ok) {
         return toast({
            variant: "destructive",
            title: "Can't get any data!",
          })
        }
        const data: T = await res.json()
        setData(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with add new collection!",
        })
      }
    }
    fetData()
  }, [url])

  return {
    loading,
    error,
    data,
  }
}
