"use client"
import DishesModel from '@/components/DishesModel'
import { useDashBoardContext } from '@/lib/context/DashboardContextProvider'
import { cn } from '@/lib/utils'
import { Pencil, Plus, X } from 'lucide-react'
import { useState } from 'react'
const categories = [
  "Đồ mặn",
  "Đồ chay",
  "Đồ ăn hàn quốc",
  "Lẩu thái",
  "Bánh mì",
  "Bánh Ruộc",
  "Bánh Mcs",
  "Khoai tây chiên thanh thanh hahfhlfhfhfhhfuuf",
]
export default function InventoriesPage() {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
  const [category, setcategory] = useState<string>('')
    
  return (
    <main className='w-full'>
    <div className='w-full min-h-fit px-3 md:px-5 py-4 md:py-6 bg-light-bg_2 dark:bg-dark-bg_2 rounded-md'>
      <div className='flex flex-col md:flex-row gap-5 md:gap-10'>
         <div className='flex-none w-[300px] max-h-[325px] overflow-y-auto no-scrollbar px-3 py-2 bg-light-bg dark:bg-dark-bg rounded-md flex flex-col'>
           <div className='flex items-center justify-between'>
              <h2>Danh mục</h2>
              <div>
                <span className='w-10 h-10 flex items-center justify-center border border-light-textSoft dark:border-dark-textSoft rounded-md cursor-pointer'>
                <Plus />
                </span>
              </div>
           </div>

           <p className='separate_line my-3'></p>
           {
            categories.map((item,index)=>(
              <div 
              key={index}
              onClick={()=>setcategory(item)}
              className={cn(
               'py-2 px-2 rounded-md cursor-pointer flex items-center justify-between text-light-text dark:text-dark-textSoft transition-transform duration-300 ease-in-out',
               category === item ? 'scale-90 bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text': ''
              )}>
                 <h4 className='max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis'>{item}</h4>
                  <div className='py-1 px-1 cursor-pointer'>
                  <Pencil />
                  </div>
              </div>
            ))
           }

         </div>

         <div className='w-full px-3 py-2 mt-0 md:mt-20  bg-light-bg dark:bg-dark-bg rounded-md flex flex-col'>
           <div className='flex items-center justify-between'>
              <h2>Món ăn của ...</h2>
              <div>
                <span 
                onClick={()=>setIsModelOpen(!isModelOpen)}
                className='w-10 h-10 flex items-center justify-center border border-light-textSoft dark:border-dark-textSoft rounded-md cursor-pointer'
                >
                <Plus />
                </span>
              </div>
           </div>

           <p className='separate_line my-3'></p>
           {
            categories.map((item,index)=>(
              <div 
              onClick={()=>setcategory(item)}
              className={cn(
               'py-2 px-2 rounded-md cursor-pointer flex items-center justify-between text-light-text dark:text-dark-textSoft transition-transform duration-300 ease-in-out',
               category === item ? 'scale-90 bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-dark-text': ''
              )}>
                 <div className='flex items-center gap-2'>
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                 <h4 className='max-w-[250px] lg:max-w-[450px] overflow-hidden whitespace-nowrap text-ellipsis'>{item}</h4>
                 </div>
                  <div className='py-1 px-1 cursor-pointer hover:text-dark-error'>
                  <X />
                  </div>
              </div>
            ))
           }
           <DishesModel isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}/>

         </div>
      </div>
    </div>

    
    </main>
  )
}
