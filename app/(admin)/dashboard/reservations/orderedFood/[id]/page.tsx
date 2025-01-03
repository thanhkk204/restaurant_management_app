"use client"
import Calculator from "@/components/custom_ui/Calculator";
import Menu from "@/components/custom_ui/Menu";
import { useGetData } from "@/hooks/useGetdata";
import { useEffect, useState } from "react";
import { DishType } from "../../../inventories/page";
import { toast } from "@/components/ui/use-toast";
import { OrderedFoodType } from "@/types/type";

export default function OrderedFood({ params }: { params: { id: string } }) {
  const { id: reservation_id } = params
  const [orderedFoods, setOrderedFoods] = useState<OrderedFoodType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  // Get all dishes and categories
  const { data: dishes, loading: dishLoading } = useGetData<DishType[]>("/api/inventories/dishes")
  const { data: categories, loading: categoryLoading } = useGetData<DishType[]>("/api/inventories/categories")

  //  Get ordered food for reservation
  useEffect(() => {
    const fetData = async () => {
      setLoading(false)
      const res = await fetch('/api/reservations/orderedFood/getAllFoodByReservationId/' + reservation_id, {
        method: "GET"
      })
      const data = await res.json() as OrderedFoodType[]
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Can't get any data for ordered dishes!",
        })
      }
      setOrderedFoods(data)
    }
    fetData()
  }, [reservation_id])

  const deleteOrderedFood = async (orderedFood_id: string) => {
    const res = await fetch('/api/reservations/orderedFood/' + orderedFood_id, {
      method: "DELETE",
    })
    const data = await res.json()
    if (!res.ok) return null
    return { res, data }
  }
  const updateOrderedFood = async (orderedFood_id: string, quantity: number): Promise<OrderedFoodType | null> => {
    const res = await fetch('/api/reservations/orderedFood/' + orderedFood_id, {
      method: "PATCH",
      body: JSON.stringify({ quantity: quantity })
    })
    const data = await res.json()
    if (!res.ok) return null
    return data.orderedFood
  }



  return (
    <div className="px-3 md:px-5 py-2 md:py-4 flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
      <div className="flex-[2] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
        {
          dishes && categories && (
            <Menu
              dishes={dishes}
              categories={categories}
              reservation_id={reservation_id}
              orderedFoods={orderedFoods}
              setOrderedFoods={setOrderedFoods}
              deleteOrderedFood={deleteOrderedFood}
            />
          )
        }
      </div>
      <div className="flex-[1] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
        {
          dishes && categories && (
            <Calculator
              dishes={dishes}
              categories={categories}
              reservation_id={reservation_id}
              orderedFoods={orderedFoods}
              setOrderedFoods={setOrderedFoods}
              deleteOrderedFood={deleteOrderedFood}
              updateOrderedFood={updateOrderedFood}
            />
          )
        }
      </div>
    </div>
  )
}