"use client"
import { CategoryType } from '@/app/(admin)/dashboard/inventories/categories/page'
import { DishType } from '@/app/(admin)/dashboard/inventories/page'
import { Check } from 'lucide-react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import OneSelect from './OneSelect'
import { cn } from '@/lib/utils'
import { OrderedFoodType } from '@/lib/constants/type'

type Props = {
    dishes: DishType[] | null
    categories: CategoryType[] | null
    reservation_id: string
    orderedFoods: OrderedFoodType[] 
    setOrderedFoods?: Dispatch<SetStateAction<OrderedFoodType[]>>
    deleteOrderedFood: (orderedFood_id: string) => any
}
 const Menu: React.FC<Props>=({dishes, categories, reservation_id, orderedFoods, setOrderedFoods, deleteOrderedFood})=>{
    const [activedLink, setActiveLink] = useState<string>('all')
   
    // choose dish depend on category id
    const categoryDishes = useMemo(()=>{
         if(activedLink === 'all'){
          return dishes
         }else if(dishes){
          return [...dishes?.filter(dish=> dish.category_id === activedLink)]
         }
    },[activedLink])
  
    const addOrderedFood = async (reservation_id: string ,dish_id: string): Promise<OrderedFoodType | null>=>{
      const res = await fetch('/api/reservations/orderedFood',{
        method: "POST",
        body: JSON.stringify({dish_id, reservation_id})
      })
      const data = await res.json()
      if(!res.ok) return null
      return data.orderedFood as OrderedFoodType
    }
    const hanleChooseDish = async (dish_id: string)=>{
      try {
      const existedOrderedFood = orderedFoods.find(item => item.dish_id._id === dish_id) as OrderedFoodType
      if(existedOrderedFood){
        const {res, data} = await deleteOrderedFood(existedOrderedFood._id)
        if(res.status === 201 && data.message === "Successfully" && setOrderedFoods)
        setOrderedFoods(pre=> [...pre.filter(item=> item._id !== existedOrderedFood?._id)]) 
      }else{
       const addedFood = await addOrderedFood(reservation_id, dish_id) as OrderedFoodType
       if( addedFood && setOrderedFoods) setOrderedFoods(pre => [...pre, addedFood])
      }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='px-3 py-4 grid grid-cols-2  [grid-auto-rows:200px] md:grid-cols-3 xl:grid-cols-4 gap-3'>
       <div className='hidden xl:block col-span-1 row-span-2 px-3 py-4'>
        <div className='xl:flex flex-col items-center justify-center h-full'>
           <div 
             onClick={()=>setActiveLink("all")}
             className={cn(
                'w-full px-3 py-4 rounded-md cursor-pointer',
                activedLink === 'all' ? 'bg-dark-bg' : ''
             )}
           >
              Tất cả
           </div>
        {
           categories?.map(item=>(
            <div
            onClick={()=>setActiveLink(item._id)}
             className={cn(
                'w-full px-3 py-4 rounded-md cursor-pointer',
                activedLink === item._id ? 'bg-dark-bg' : ''
             )}
            >
                {item.title}
            </div>
           ))
        }
        </div>
       </div>
       {
        categoryDishes?.map(dish=>
          <div 
           key={dish._id}
           onClick={()=>hanleChooseDish(dish._id)}
           className='relative rounded-md overflow-hidden cursor-pointer hover:scale-95 transition-transform duration-200 ease-in'
          >
            <Image 
            src={dish.image[0]} 
            alt={dish.title} 
            width={1000} 
            height={1000}
            className='w-full h-full object-cover'
             />
            <h2 className='absolute z-20 left-0 bottom-0 w-full h-[50px] flex items-center justify-center bg-blur_bg text-white'>{dish.title}</h2>
            <div className={cn(
                'absolute top-0 left-0 z-30 bg-blur_bg dark:bg-blur_bg rounded-md',
                orderedFoods.find(orderedFood => orderedFood.dish_id._id === dish._id )? 'block' : 'hidden'
            )}>
            <Check width={35} height={35} className='font-extrabold text-light-success dark:text-dark-success' />
            </div>
          </div>
        )
       }
    </div>
  )
}
export default Menu