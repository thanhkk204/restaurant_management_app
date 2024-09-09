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
      console.log("page index",flipBookRef.current.pageFlip().getCurrentPageIndex())
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

  console.log({isOpen})
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
          // muted
          loop
        >
        </video>
       
    
    <div className="w-full pt-[160px] relative overflow-hidden">
        <section className="py-0">
          <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
            <div className="order-2 lg:order-1 lg:flex-1  rounded-2xl overflow-hidden w-[350px] sm:w-[450px] md:w-[650px] h-[350px] sm:h-[450px] lg:h-[550px]  flex items-center justify-center">
              <GoogleMap />
            </div>

            <div className="flex-1 h-full order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-5 md:gap-8">
                {/* 1 box */}
                <div className="relative bg-white/90 text-light-text rounded-[30px] min-w-[200px] h-[200px] w-full md:h-[250px] py-4 px-3 flex flex-col items-center mx-auto shadow-[inset_10px_10px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.15)]">
                   <div className="animate-bounce min-w-12 min-h-12 rounded-full flex items-center justify-center bg-light-primaryColor dark:bg-dark-primaryColor text-white ">
                    <span className="inline-flex w-12 h-12 rounded-full animate-ping absolute bg-light-primaryColor dark:bg-dark-primaryColor duration-1500">

                    </span>
                    <MapPin />
                   </div>
                   <h1 className="text-light-text uppercase text-xl tracking-wide font-bold text-nowrap leading-7 pb-2 pt-4">Location</h1>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà nội
                   </p>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden 
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    Từ Đài, Chuyên Ngoại, Duy Tiên, Hà Nam
                   </p>
                </div>
                {/* 1 box */}
                <div className="relative bg-white/90 text-light-text rounded-[30px] min-w-[200px] h-[200px] w-full md:h-[250px] py-4 px-3 flex flex-col items-center mx-auto shadow-[inset_10px_10px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.15)]">
                   <div className="min-w-12 min-h-12 rounded-full flex items-center justify-center bg-light-secondaryColor dark:bg-dark-secondaryColor text-white ">
                    <span className="inline-flex w-12 h-12 rounded-full animate-ping absolute bg-light-secondaryColor dark:bg-dark-secondaryColor duration-1500">

                    </span>
                   <Phone />
                   </div>
                   <h1 className="text-light-text uppercase text-xl tracking-wide font-bold text-nowrap leading-7 pb-2 pt-4">Phone Number</h1>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    +84 92238894
                   </p>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden 
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    +84 113114115
                   </p>
                </div>
                {/* 1 box */}
                <div className="relative bg-white/90 text-light-text rounded-[30px] min-w-[200px] h-[200px] w-full md:h-[250px] py-4 px-3 flex flex-col items-center mx-auto shadow-[inset_10px_10px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.15)]">
                   <div className="min-w-12 min-h-12 rounded-full flex items-center justify-center bg-light-warning dark:bg-dark-warning text-white ">
                    <span className="inline-flex w-12 h-12 rounded-full animate-ping absolute bg-light-warning dark:bg-dark-warning duration-1500">

                    </span>
                    <Coins />
                   </div>
                   <h1 className="text-light-text uppercase text-xl tracking-wide font-bold text-nowrap leading-7 pb-2 pt-4">Faxx</h1>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    1-2345-678900
                   </p>
                </div>
                {/* 1 box */}
                <div className="relative bg-white/90 text-light-text rounded-[30px] min-w-[200px] h-[200px] w-full md:h-[250px] py-4 px-3 flex flex-col items-center mx-auto shadow-[inset_10px_10px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.15)]">
                   <div className="min-w-12 min-h-12 rounded-full flex items-center justify-center bg-light-success dark:bg-dark-success text-white ">
                    <span className="inline-flex w-12 h-12 rounded-full animate-ping absolute bg-light-success dark:bg-dark-success duration-1500">

                    </span>
                    <Mail />
                   </div>
                   <h1 className="text-light-text uppercase text-xl tracking-wide font-bold text-nowrap leading-7 pb-2 pt-4">Email</h1>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    thanhhuyle2805@gmail.com
                   </p>
                </div>
              </div>
            </div>

          </div>

        </section> 

     
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
              <div className="w-full h-full flex justify-center pt-[120px]">
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
              className=" h-full min-w-[400px] lg:sticky lg:top-20 hidden lg:block z-20"
            >
              <FilteredProducts categories={Categories}/>
            </motion.div>
            )
          }
          
          <motion.div 
          layout
          className="container w-full text-light-text dark:text-dark-text overflow-hidden"
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