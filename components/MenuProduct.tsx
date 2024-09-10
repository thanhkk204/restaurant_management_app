import React, { FC } from 'react'
import {AnimatePresence, motion} from "framer-motion"
import Image from 'next/image'
import { Plus, Star } from 'lucide-react'

type Product = {
    title: string;
    star: number;
    person: number;
    price: number;
    category: string
}
type Props = {
    products: Product[]
    indicator: string
}
export const MenuProduct:FC<Props> = ({products, indicator}) => {
    return (
        <AnimatePresence mode='popLayout'>
            {
                products.map((item, index)=>{
                    //  Check If indicator is "All", render All
                    if (indicator === "All") {
                       return ( <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, x: 500 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -500 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.3 },
                          }}
                        className='relative product_shadow dark:product_shadow_dark min-w-[370px] md:min-w-[430px] rounded-3xl px-4 md:px-12 py-3 md:py-12 flex flex-col items-center justify-center mt-[150px] mx-0 md:mx-[20px] cursor-pointer'
                    >
            
                        <Image
                        // relative top-[-50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                        className='mt-[-130px] mb-0 md:mb-[30px] boxShadow_i rounded-full w-[230px] h-[230px] md:w-[250px] md:h-[250px] overflow-hidden'
                         src={"/images/dish/1.png"}
                         alt='dish'
                         width={250}
                         height={250}
                        />
            
                        <div className='flex items-center gap-1 md:gap-2 py-1 md:py-2'>
                            <p className='font-medium font-serif text-lg text-light-textSoft dark:text-dark-textSoft'>{item.star}</p>
                            <Star 
                             className='text-light-warning dark:text-dark-warning'
                            />
                        </div>
            
                        <h1 className='font-semibold font-serif text-light-text dark:text-dark-text truncate py-2 md:py-4 text-3xl'>{item.title}</h1>
                        <p className='text-light-textSoft dark:text-dark-textSoft text-sm'>120 calo</p>
            
                        <div className='w-full py-3 md:py-5 flex items-center justify-between text-light-text dark:text-dark-text shadow-sm rounded-md'>
                          <div className=' flex-1 flex flex-col '>
                             <p className='text-light-textSoft dark:text-dark-textSoft'>Type</p>
                             <p className='font-bold leading-5'>None - Veg</p>
                          </div>
            
                          
            
                          <div className='relative flex-1 flex flex-col text-end'>
                          <p className='ver_separate_line absolute top-0 left-0'></p>
                             <p className='text-light-textSoft dark:text-dark-textSoft'>Person</p>
                             <p className='font-bold leading-5'>{item.person}</p>
                          </div>
                        </div>
                        <p className='separate_line w-full'></p>
            
                        <div className='w-full flex items-center justify-between py-3 md:py-6'>
                            <h1 className=' font-bold text-3xl text-light-text dark:text-dark-text'>{item.price}$</h1>
            
                            <button 
                            className='yellowBtn text-lg px-2 py-2 rounded-lg '>
                             <Plus className='font-bold text-white' />
                            </button>
                        </div>
                    </motion.div>)
                      }
                    //   If indicator is specific category
                      if (item.category === indicator) {
                       return ( <motion.div
                        key={index}
                        layout
                        initial={{ opacity: 0, x: 500 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -500 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.3 },
                          }}
                        className='relative product_shadow dark:product_shadow_dark min-w-[370px] md:min-w-[430px] rounded-3xl px-4 md:px-12 py-3 md:py-12 flex flex-col items-center justify-center mt-[150px] mx-0 md:mx-[20px] cursor-pointer'
                    >
            
                        <Image
                        // relative top-[-50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                        className='mt-[-130px] mb-0 md:mb-[30px] boxShadow_i rounded-full w-[230px] h-[230px] md:w-[250px] md:h-[250px] overflow-hidden'
                         src={"/images/dish/1.png"}
                         alt='dish'
                         width={250}
                         height={250}
                        />
            
                        <div className='flex items-center gap-1 md:gap-2 py-1 md:py-2'>
                            <p className='font-medium font-serif text-lg text-light-textSoft dark:text-dark-textSoft'>{item.star}</p>
                            <Star 
                             className='text-light-warning dark:text-dark-warning'
                            />
                        </div>
            
                        <h1 className='font-semibold font-serif text-light-text dark:text-dark-text truncate py-2 md:py-4 text-3xl'>{item.title}</h1>
                        <p className='text-light-textSoft dark:text-dark-textSoft text-sm'>120 calo</p>
            
                        <div className='w-full py-3 md:py-5 flex items-center justify-between text-light-text dark:text-dark-text shadow-sm rounded-md'>
                          <div className=' flex-1 flex flex-col '>
                             <p className='text-light-textSoft dark:text-dark-textSoft'>Type</p>
                             <p className='font-bold leading-5'>None - Veg</p>
                          </div>
            
                          
            
                          <div className='relative flex-1 flex flex-col text-end'>
                          <p className='ver_separate_line absolute top-0 left-0'></p>
                             <p className='text-light-textSoft dark:text-dark-textSoft'>Person</p>
                             <p className='font-bold leading-5'>{item.person}</p>
                          </div>
                        </div>
                        <p className='separate_line w-full'></p>
            
                        <div className='w-full flex items-center justify-between py-3 md:py-6'>
                            <h1 className=' font-bold text-3xl text-light-text dark:text-dark-text'>{item.price}$</h1>
            
                            <button 
                            className='yellowBtn text-lg px-2 py-2 rounded-lg '>
                             <Plus className='font-bold text-white' />
                            </button>
                        </div>
                    </motion.div>)
                      
                      }
 })
            }
        </AnimatePresence>
       
  )
}
