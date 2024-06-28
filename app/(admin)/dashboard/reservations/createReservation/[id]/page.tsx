"use client"
import Calculator from "@/components/custom_ui/Calculator";
import Menu from "@/components/custom_ui/Menu";
import { useGetData } from "@/hooks/useGetdata";
import { DishType } from "../../../inventories/page";
import { useState } from "react";

export default function createReservation({params}: {params: {id:string}}) {
    const [selectedDishes, setSelectedDishes] = useState<DishType[]>([])
    const {data: dishes, loading: dishLoading} = useGetData<DishType[]>("/api/inventories/dishes")
    const {data: categories, loading: categoryLoading} = useGetData<DishType[]>("/api/inventories/categories")
    
    return (
      <section className="px-3 md:px-5 py-2 md:py-4 flex flex-col xl:flex-row gap-5 w-full h-full pb-[80px]">
        <div className="flex-[2] bg-light-bg_2 dark:bg-dark-bg_2 rounded-md">
         {
          dishes && categories && (
            <Menu 
            dishes={dishes}
            categories={categories}
            selectedDishes={selectedDishes}
            setSelectedDishes={setSelectedDishes}
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
            selectedDishes={selectedDishes}
            setSelectedDishes={setSelectedDishes}
            />
          )
         }
        </div>
      </section>
     )
}