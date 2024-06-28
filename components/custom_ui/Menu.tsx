"use client"
import { CategoryType } from '@/app/(admin)/dashboard/inventories/categories/page'
import { DishType } from '@/app/(admin)/dashboard/inventories/page'
import { Check } from 'lucide-react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import OneSelect from './OneSelect'
import { cn } from '@/lib/utils'

type Props = {
    dishes: DishType[] | null
    categories: CategoryType[] | null
    selectedDishes: DishType[] 
    setSelectedDishes?: Dispatch<SetStateAction<DishType[]>>
}
 const Menu: React.FC<Props>=({dishes, categories, selectedDishes, setSelectedDishes})=>{
    const [activedLink, setActiveLink] = useState<string>('all')
    const [menu, setMenu] = useState<DishType[]>([])
    useEffect(()=>{
      if (activedLink === 'all') {
        setMenu(()=>{
            return dishes ? [...dishes] : []
        })  
      }else{
        setMenu(()=>{
            return dishes ? [...dishes.filter(dish => dish.category_id === activedLink)] : []
        })
      }
    }, [activedLink])
    const hanleChooseDish = (dish: DishType)=>{
        if (setSelectedDishes) {
            setSelectedDishes((prevDishes) =>{
              return prevDishes.includes(dish) ? [...prevDishes.filter(item=> item._id !== dish._id)] : [...prevDishes, dish]
            });
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
        menu?.map(dish=>
          <div 
          key={dish._id}
           onClick={()=>hanleChooseDish(dish)}
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
                selectedDishes.includes(dish) ? 'block' : 'hidden'
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