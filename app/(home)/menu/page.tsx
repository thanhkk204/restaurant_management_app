"use client"
import { CategoryType } from "@/app/(admin)/dashboard/inventories/categories/page";
import Menu from "@/components/custom_ui/Menu";
import FilteredProducts from "@/components/FilteredProducts"
import GoogleMap from "@/components/GoogleMap"
import MenuBook from "@/components/Menu";
import { useGetData } from "@/hooks/useGetdata";
import { fetchProducts } from "@/redux/features/productSlice";
import { filteredProduct, productSelector, searchNameSelector } from "@/redux/selector";
import { RootState, useAppDispatch } from "@/redux/store";
import { FilteredProductType } from "@/types/type";
import { Coins, Mail, MapPin, Phone, SlidersHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AnimatePresence, motion} from "framer-motion"
import { cn } from "@/lib/utils";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import MapSection from "@/components/MapSection";

const MenuPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: responDishes, loading: dishLoading } = useGetData<{dishes: FilteredProductType[]}>('/api/filteredProduct')
  const { data: Categories, loading: categoryLoading } = useGetData<CategoryType[]>("/api/inventories/categories")

  const dispatch = useAppDispatch();
  const products = useSelector(filteredProduct) as FilteredProductType[]
  const {categories, searchName, prices} = useSelector((state: RootState) => state.filters)
  const flipBookRef = useRef<any>(null)
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(()=>{
    if (flipBookRef.current && flipBookRef && flipBookRef.current.pageFlip()) {
      if (flipBookRef.current.pageFlip().getCurrentPageIndex() !== 1) {
        console.log('vao')
        setTimeout(() => {
          if(window.innerWidth < 1250){
             return  flipBookRef.current.pageFlip().turnToPage(1);
          }
          flipBookRef.current.pageFlip().flip(1);
        }, 200);
      }
    }
  },[categories, searchName, prices])

  return (
    <>
    {/* Background for mobile screen */}
    <video
         className="w-full absolute left-0 top-0 -z-10 block xl:hidden"
          src="/videos/map_background_2.mp4"
          // controls
          autoPlay
          muted
          loop
        >
        </video>
         {/* Background for desktop screen */}
       <video
        className="w-full absolute left-0 top-0 -z-10 hidden xl:block"
          src="/videos/map_background.mp4"
          // controls
          autoPlay
          muted
          loop
        >
        </video>
       
    
    <div className="w-full pt-[160px] relative">
      <MapSection/>
       <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "py-3 px-3 rounded-xl btnCustom dark:btnCustom_dark text-white outline-none sticky top-20 z-30",
            )}
          >
            <SlidersHorizontal />
          </motion.button>

          {/* Filter mobile */}
          {
            isOpen && (
              <div
              className="fixed top-0 left-0 z-50 h-screen w-screen bg-black/15 block lg:hidden"
              onClick={()=>setIsOpen(!isOpen)}
            >
              <div className="w-full h-full flex justify-center pt-[160px]">
              <div onClick={(e)=>e.stopPropagation()}>

              <FilteredProducts categories={Categories}/>
              </div>
              </div>
            </div>
            )
          }
        {/* Filter desktop */}
        <div className="w-full flex">
        <AnimatePresence mode="popLayout">
          {
            isOpen && (
              <motion.div
              key="filtered-products"
              initial={{ x: "-100%"}}
              animate={{ x: 0}} 
              exit={{ x: "-100%"}}
              transition={{type: "spring", stiffness: 300, damping: 25}}
              className=" h-full min-w-[400px] lg:sticky lg:top-20 hidden lg:block z-20 mt-[75px]"
            >
              <FilteredProducts categories={Categories}/>
            </motion.div>
            )
          }
          
          <motion.div 
          layout
          className="container w-full  text-light-text dark:text-dark-text overflow-hidden"
          >
              {
                responDishes?.dishes && <MenuBook
                  ref={flipBookRef}
                  filteredProducts={products}
                  dishes={responDishes.dishes}
                />
              }
          </motion.div>
          </AnimatePresence>
        </div>
      </div>
        
    </>
  )
}

export default MenuPage