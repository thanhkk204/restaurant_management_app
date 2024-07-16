"use client"
import { useGetData } from '@/hooks/useGetdata';
import { useMemo, useState } from 'react';
import { DishType } from '../(admin)/dashboard/inventories/page';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { useCart } from '@/lib/context/CartProvider';
import { CartItem } from '@/lib/constants/type';

export default function RootPage() {
  const [activedLink, setActiveLink] = useState<string>('all')
  // Get all dishes and categories
  const {data: dishes, loading: dishLoading} = useGetData<DishType[]>("/api/inventories/dishes")
  const {data: categories, loading: categoryLoading} = useGetData<DishType[]>("/api/inventories/categories")
  // choose dish depend on category id
  const categoryDishes= useMemo(()=>{
    if(activedLink === 'all'){
     return dishes
    }else if(dishes){
     return [...dishes?.filter(dish=> dish.category_id === activedLink)]
    }
  },[activedLink, dishes])
  
  // add to cart action
  const { addItem} = useCart();
  const handleAddToCart = (item: CartItem)=>{
      addItem(item)
  }
  return (
    <section className='w-full bg-light-bg_2 dark:bg-dark-bg_2 px-3 py-4 grid grid-cols-2 [grid-auto-rows:200px] md:grid-cols-3 xl:grid-cols-4 gap-3'>
       <div className='hidden xl:block col-span-1 row-span-2 px-3 py-4'>
        <div className='xl:flex flex-col items-center justify-center h-full'>
           <div 
             onClick={()=>setActiveLink("all")}
             className={cn(
                'w-full px-3 py-4 rounded-md cursor-pointer text-light-text dark:text-dark-text',
                activedLink === 'all' ? 'bg-dark-bg' : ''
             )}
           >
              Tất cả
           </div>
        {
           categories?.map(item=>(
            <div
            key={item._id}
             onClick={()=>setActiveLink(item._id)}
             className={cn(
                'w-full px-3 py-4 rounded-md cursor-pointer text-light-text dark:text-dark-text',
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
           onClick={()=>handleAddToCart({
            dish_id: dish._id,
            title: dish.title,
            image: dish.image[0],
            price: dish.price,
            quantity: 1,
          })}
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
            {/* <div className={cn(
                'absolute top-0 left-0 z-30 bg-blur_bg dark:bg-blur_bg rounded-md',
                orderedFoods.find(orderedFood => orderedFood.dish_id._id === dish._id )? 'block' : 'hidden'
            )}>
            <Check width={35} height={35} className='font-extrabold text-light-success dark:text-dark-success' />
            </div> */}
          </div>
        )
       }
    </section>
  )
}