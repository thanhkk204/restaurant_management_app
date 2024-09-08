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
import { SlidersHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AnimatePresence, motion} from "framer-motion"
import { cn } from "@/lib/utils";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
// const PageCover = React.forwardRef((props, ref) => {
//   return (
//     <div className="page page-cover" ref={ref} data-density="hard">
//       <div className="page-content">
//         <h2>{props.children}</h2>
//       </div>
//     </div>
//   );
// });

// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="page" ref={ref}>
//       <div className="page-content">
//         <h2 className="page-header">Page header - {props.number}</h2>
//         <div className="page-image"></div>
//         <div className="page-text">{props.children}</div>
//         <div className="page-footer">{props.number + 1}</div>
//       </div>
//     </div>
//   );
// });
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
  const handleClick = ()=>{
    console.log(window.innerWidth)
    // flipBookRef.current.pageFlip().flip(0);
  }
  return (
    <div className="w-full py-10">  
     {/* <section className="py-0">
      <div className="rounded-2xl overflow-hidden">
       <GoogleMap />
      </div>
     </section> */}

     <button onClick={()=>handleClick()}>Click</button>
     
        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "py-3 px-3 rounded-xl btnCustom dark:btnCustom_dark text-white outline-none sticky top-20 z-30",
            )}
          >
            <SlidersHorizontal />
          </motion.button>
          {
            isOpen && (
              <motion.div
              layout
              className="fixed top-0 left-0 z-50 h-screen w-screen bg-black/15 block lg:hidden"
              onClick={()=>setIsOpen(!isOpen)}
            >
              <div className="w-full h-full flex justify-center pt-[120px]">
              <div onClick={(e)=>e.stopPropagation()}>

              <FilteredProducts categories={Categories}/>
              </div>
              </div>
            </motion.div>
            )
          }

        <div className="w-full flex">
        <AnimatePresence mode="popLayout">
          {
            isOpen && (
              <motion.div
              layout
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
          className="container w-full text-light-text dark:text-dark-text py-10 overflow-hidden"
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
  )
}

export default MenuPage