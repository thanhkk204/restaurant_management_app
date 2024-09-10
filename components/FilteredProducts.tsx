"use client"
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import PriceRange from './custom_ui/PriceRange'
import { Button } from './ui/button'
import { useState } from 'react'
import {motion, AnimatePresence} from 'framer-motion'

import { resetFilter, setCategoryFilter, setPriceFilter, setTitleFilter } from '@/redux/features/filterSlice'
import { RootState, useAppDispatch } from '@/redux/store'
import { useDebouncedCallback } from 'use-debounce'
import { useGetData } from '@/hooks/useGetdata'
import { CategoryType } from '@/app/(admin)/dashboard/inventories/categories/page'
import { useSelector } from 'react-redux'

type Props = {
  categories: CategoryType[] | null
}

const FilteredProducts = ({categories}:Props) => {
  const dispatch = useAppDispatch()
  const [isShowing, setIsShowing] = useState<boolean>(false)
 
  const ArrowUp = motion(ChevronUp)
  const ArrowDown = motion(ChevronDown)

  const { searchName, prices , categories: filteredCategories } = useSelector((state: RootState) => state.filters);

  const searchFilterChange = useDebouncedCallback(
     (e) => {
      dispatch(setTitleFilter(e.target.value))
     }, 800
  );
  const priceFilterChange = useDebouncedCallback(
     (numbers) => {
      dispatch(setPriceFilter(numbers))
     }, 300
  );
  const categoryFilterChange = useDebouncedCallback(
     (isChecked, title) => {
      console.log({title, isChecked})
      dispatch(setCategoryFilter({title, isChecked}))
     }, 50
  );
  const handleClickReset = ()=>{
    dispatch(resetFilter())
  }
  return (
    <>
    <AnimatePresence>
       <motion.div 
        className='w-full min-w-[380px] rounded-2xl py-3 px-4 md:py-4 md:px-5 bg-light-bg_2 dark:bg-dark-bg_2'
      >
        <div className='flex flex-col '>
          <h1 className='text-xl text-end truncate text-light-text dark:text-dark-text font-medium pb-3 md:pb-5'>
            Showing 1 of 15 products
          </h1>
          <p className='separate_line '></p>
  
          
          <form className="hidden md:block pt-4 md:pt-5">
              <div className="px-3 py-3 dark:px-3 dark:py-3 bg-white dark:bg-dark-bg_2 rounded-lg dark:border
             dark:border-dark-bg_2 flex items-center gap-3 btnCustom dark:btnCustom_dark cursor-pointer"
              >
                <Search className="text-light-text dark:text-dark-text" />
                <input
                  type="text"
                  className="bg-transparent border-none outline-none text-light-text dark:text-dark-text "
                  placeholder="Type here"
                  onChange={searchFilterChange}
                />
              </div>
          </form>
          
  
          <div className='flex flex-col py-4 md:py-5 '>
            <p className='text__para my-0 py-1'>
              Sort by
            </p>
            <Select >
              <SelectTrigger className="w-full outline-none border-none dark:focus::ring-0 dark:focus:ring-offset-0 
               bg-light-bg dark:bg-dark-bg focus:ring-0 focus:ring-offset-0 text-light-text dark:text-dark-text text-[17px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className='bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-[17px]'>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className='separate_line '></p>
  
          <div className='flex flex-col py-4 md:py-5 '>
            <p className='text__para my-0 py-1 flex items-center justify-between cursor-pointer' onClick={()=>setIsShowing(!isShowing)}>
              Showing
              <AnimatePresence mode='popLayout'>
               {
               isShowing ? 
               <ArrowUp 
               layout
               initial={{ opacity: 1}}
               animate={{ opacity: 1}}
               exit={{ opacity: 0 }}
               transition={{ duration: 1.3, ease: 'easeIn' }}
               /> : 
               <ArrowDown 
               layout
               initial={{ opacity: 1}}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0}}
               transition={{ duration: 1.3, ease: 'easeIn' }}
               />
               }
              </AnimatePresence>
            </p>
            <AnimatePresence>
            {
              isShowing && (<motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='flex flex-col'
              >
                <div className='flex items-center justify-between py-1'>
                  <label htmlFor="allProducts" className='text-lg text-light-text dark:text-dark-text'>All </label>
                  <Checkbox id='allProducts' checked={filteredCategories.includes('All')} className='w-[1.5rem] h-[1.5rem] rounded-md' onCheckedChange={isChecked=>categoryFilterChange(isChecked, "All")} />
                </div>
                {
                  categories?.map(category=>(
                <div key={category._id} className='flex items-center justify-between py-1'>
                  <label htmlFor="allProducts" className='text-lg text-light-text dark:text-dark-text'>{category.title}</label>
                  <Checkbox id='allProducts' checked={filteredCategories.includes(category.title)} className='w-[1.5rem] h-[1.5rem] rounded-md' onCheckedChange={isChecked=>categoryFilterChange(isChecked, category.title)} />
                </div>
                  ))
                }
              </motion.div>)
            }
            </AnimatePresence>
  
          </div>
  
          <p className='separate_line '></p>
  
  
          <div className='flex flex-col py-4 md:py-5 '>
            <p className='text__para my-0 py-1'>
              Price
            </p>
            <PriceRange rtl={false} priceFilterChange={priceFilterChange} min={prices[0]} max={prices[1]} />
          </div>
  
        <div className='text-end'>
        <Button 
        onClick={()=>handleClickReset()}
         className='transition-all duration-300 ease-in hover:btnCustom dark:hover:btnCustom_dark'
        >Reset</Button>
        </div>
        </div>
      </motion.div>

    </AnimatePresence>
    </>
  )
}

export default FilteredProducts