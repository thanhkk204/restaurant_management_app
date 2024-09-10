"use client"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { MenuProduct } from './MenuProduct';
import { HeadingSection } from './HeadingSection';

const menu = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner"
]
const dishes = [
  {
    category: "All",
    title: "Chicken fried",
    star: 4.5,
    person: 2,
    price: 809
  },
  {
    category: "Breakfast",
    title: "Apple meo meo",
    star: 5,
    person: 6,
    price: 908
  },
  {
    category: "All",
    title: "Potato fried",
    star: 3.5,
    person: 1,
    price: 108
  },
  {
    category: "All",
    title: "Potato fried",
    star: 3.5,
    person: 1,
    price: 108
  },
  {
    category: "All",
    title: "Potato fried",
    star: 3.5,
    person: 1,
    price: 108
  },
]
const MenuSection = () => {
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const [indicator, setIndicator] = useState<string>("All")
    const itemsRef = useRef<(HTMLButtonElement | null)[]>([]); 
    useEffect(()=>{
        const initialItem = itemsRef.current[0];
        if (initialItem) {
          setIndicatorStyle({
            left: initialItem.offsetLeft,
            width: initialItem.offsetWidth,
          });
        }
    },[])

    const handleClick = (index: number) => {
        const item = itemsRef.current[index];
        setIndicator(menu[index])
        if (item) {
          setIndicatorStyle({
            left: item.offsetLeft,
            width: item.offsetWidth,
          });
        }
      };

  return (
    <div className='w-full min-h-[150vh] menuBackGroundImage'>
    <section >
          <HeadingSection
             title='About us'
             desc='Discorver our restaurant story'
            />
        <div className='flex flex-col items-center justify-center'>
          <div className='py-6 '>
            {/* Menu navbar */}
            <div className='w-[370px] md:w-fit overflow-x-auto rounded-[50px] navBar_shadow dark:navBar_shadow_dark'>
            <div className='min-w-[500px] relative flex items-center justify-between rounded-[50px] '>
              {
                menu.map((item, index) => (
                  <button
                    ref={(el) => {
                      itemsRef.current[index] = el
                    }}
                    key={index}
                    onClick={() => handleClick(index)}
                    className='px-3 md:px-5 py-3 flex items-center gap-1 cursor-pointer'
                  >
                    <Image
                      width={35}
                      height={35}
                      alt='menu icon'
                      src={`/images/menu-${index + 1}.png`}
                    />
                    <h4 className={cn(
                      'font-semibold capitalize text-light-text dark:text-dark-text',
                      indicator === item ? "text-white" : ''
                    )}>
                      {item}
                    </h4>
                  </button>
                ))
              }

              {/* indicator */}
              <div
                className={`absolute h-full -z-10 bg-light-warning dark:bg-dark-primaryColor rounded-[50px] overflow-hidden transition-all duration-200 ease-out `}
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              >

              </div>
            </div>
            </div>

          </div>

        </div>

        {/* dishes */}
        <div className='relative w-full flex flex-col lg:flex-row items-center flex-wrap py-4 md:py-6'>
          <MenuProduct products={dishes} indicator={indicator} />
        </div>
    </section>
    </div>
  )
}

export default MenuSection