"use client"
import { useCart } from "@/lib/context/CartProvider"
import { cn, formatCurrency } from "@/lib/utils"
import { CartItem, FilteredProductType } from "@/types/type"
import Image from "next/image"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import { FaCartPlus } from "react-icons/fa"
import HTMLFlipBook from "react-pageflip"

import PageProduct from "./PageProduct"
import PageCover from "./ReactFlip/PageCover"
import PageMenu from "./ReactFlip/PageMenu"
import { ChevronsLeft, ChevronsRight } from "lucide-react"


type MenuBookProps = {
    filteredProducts: FilteredProductType[]
    dishes: FilteredProductType[] | null
}
const MenuBook = forwardRef<HTMLDivElement, MenuBookProps>((props, ref) => {
  const [productPerPage, setProductPerPage] = useState<number>(4)
  const [page, setCurrentPage] = useState<number>(0)
  
  const {filteredProducts, dishes} = props
  // Check if ref stick with localRef, localRef is used for HTMLFlipBook
  const localRef = useRef<any>(null);
  useEffect(() => {
    if (ref && typeof ref === 'function') {
      ref(localRef.current); // Nếu là callback ref, gọi hàm với current element
    } else if (ref && 'current' in ref) {
      ref.current = localRef.current; // Nếu là MutableRefObject, gán giá trị
    }
  }, [ref]);


  // Hàm tách sản phẩm theo category
  const groupByCategory = (dishes: FilteredProductType[] | null) => {
    if (dishes === null) return null
    return dishes.reduce((acc: { [key: string]: FilteredProductType[] }, product) => {
      // Kiểm tra nếu category chưa có trong acc thì khởi tạo nó
      if (!acc[product.category_id.title]) {
        acc[product.category_id.title] = [];
      }
      // Thêm sản phẩm vào danh sách của category tương ứng
      acc[product.category_id.title].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(dishes)
    // add to cart action
    const { addItem } = useCart()
    const handleAddToCart = (item: CartItem) => {
      addItem(item)
    }
 
  const handlehandleNextFlip = ()=>{
    localRef?.current.pageFlip().flipNext()
  }
  const handlePreviousFlip = () => {
    if (localRef?.current) {
      const pageFlip = localRef.current.pageFlip();
      if (pageFlip.getOrientation() === "portrait") {
        // Chế độ 1 trang
        pageFlip.turnToPrevPage();
      } else {
        // Chế độ 2 trang
        pageFlip.flipPrev();
      }
    }
  };


  return (
    <>
      <div className="w-full">
        {/* Quyển sách */}
       
        <HTMLFlipBook
          style={{}}
          // children={{}}
          startPage={0}
          width={550} 
          height={733}
          size="stretch"
          minWidth={345}
          maxWidth={1033}
          minHeight={633}
          maxHeight={1033}
          drawShadow={true}
          flippingTime={600}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={0}
          showPageCorners={false}
          disableFlipByClick={true}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={(e) => {
             if(localRef && localRef.current){
               setCurrentPage(localRef?.current.pageFlip().getCurrentPageIndex())
             }
            
          }}
          onChangeOrientation={()=>{}}
          onChangeState={(e)=>{}}
          className="demo-book"
          ref={localRef}
        >
          <PageCover>
            <div className="absolute"></div>
          </PageCover>
          {
            // Just for render 1 page All
           filteredProducts && [...Array(1).keys()].map((currentPage, index)=>{
             return <PageMenu category="All" currentPage={page} key={index}>
               <PageProduct filteredProducts={filteredProducts} />
             </PageMenu>
              })
          }
          {
            // Render category page reply on quantity and productPerPage state, minimum 2 page each category
            groupedProducts !== null && Object.keys(groupedProducts).map((category, indexCate) => {
              const num = Math.ceil(groupedProducts[category].length / productPerPage)
              //  minimum 2 pages
              const pageNumber = num >= 3 ? num : 2
              //  console.log({category, number})
              return [...Array(pageNumber).keys()].map((pageInCategory, indexPage) => (
                <PageMenu category={category}  currentPage={page} key={indexPage}>
                  {/* For destopPage */}
                  <div className="w-full hidden md:flex items-center justify-center flex-wrap  gap-5 ">
                  {groupedProducts[category].map((dish, index) => {
                    // find where the page start and the page end
                    return (index >= pageInCategory * productPerPage && index < (pageInCategory + 1) * productPerPage) ?
                    ( <div key={dish._id} className="w-[280px] min-w-[280px] min-h-[280px] rounded-3xl shadow-[3px_3px_5px_rgba(0,0,0,0.25),-3px_-3px_5px_rgba(0,0,0,0.25)] bg-transparent border border-black/35 overflow-hidden">
                      <div className="w-[280px] min-w-[280px] h-[240px] overflow-hidden rounded-3xl ">
                      <Image
                       src={dish.image[0]}
                       alt="dish"
                       width={280}
                       height={280}
                       className="object-cover"
                      />
                      </div>
                      <div className="w-[280px] px-3 md:px-4 py-2 md:py-4 flex items-center justify-between overflow-hidden">
                       <div className="flex-[4] overflow-hidden">
                       <h1 className="text-2xl font-serif tracking-wide truncate ">{dish.title}</h1>
                       <h1>{formatCurrency(dish.price)}</h1>
                       <p className="text-justify">{dish.desc}</p>
                       </div>
                       <div className="flex-1 flex items-center justify-center">
                          <button 
                           onClick={() =>
                            handleAddToCart({
                              dish_id: dish._id,
                              title: dish.title,
                              image: dish.image[0],
                              price: dish.price,
                              quantity: 1,
                            })}
                            className="w-[45px] h-[45px] bg-transparent rounded-3xl border border-black/35 flex items-center justify-center 
                            shadow-[3px_3px_3px_rgba(0,0,0,0.25),-2px_-2px_3px_rgba(255,255,255,0.25)]"
                            >
                           <FaCartPlus
                            className="w-6 h-6 transition-all ease-in-out hover:scale-110"
                            />
                          </button>
                       </div>
                      </div>
                    </div>) : <></>
                  })}
                  </div>
                  {/* For mobile Page */}
                  <div className="flex md:hidden flex-col gap-5">
                   {groupedProducts[category].map((dish, index) => {
                    // find where the page start and the page end
                    return (index >= pageInCategory * productPerPage && index < (pageInCategory + 1) * productPerPage) ?
                    (<div key={dish._id} className="flex items-center justify-center gap-3">
                      <button
                       onClick={() =>
                        handleAddToCart({
                          dish_id: dish._id,
                          title: dish.title,
                          image: dish.image[0],
                          price: dish.price,
                          quantity: 1,
                        })}
                      >
                        <CiCirclePlus 
                         className="w-6 h-6 transition-all ease-in-out hover:scale-110"
                        />
                      </button>
                      <p className="text-nowrap cursor-pointer hover:text-red-1">
                        {dish.title}
                      </p>
                      <div className="flex-grow w-full py-1  border-b-[1.8px] border-dashed border-black">

                      </div>
                      <p className="text-nowrap">{formatCurrency(dish.price)}</p>
                    </div>) : <></>
                    })}
                  </div>
                    
                </PageMenu>
              ))
            })
          }
           <PageCover>
            <div className="absolute"></div>
          </PageCover>
        </HTMLFlipBook>

        <div className="container relative flex items-center justify-center py-6 md:py-10">
          <div className='min-w-[350px] max-w-[650px] mx-auto relative flex items-center justify-between'>
            <div
              onClick={() => handlePreviousFlip()}
              className="relative w-fit "
            >
              <div className='w-16 h-16 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner'>
                <ChevronsLeft
                  className='text-orange-1 dark:text-dark-primaryColor w-[25px]'
                />
              </div>
            </div>


            <div
              onClick={() => handlehandleNextFlip()}
              className="relative w-fit ">
              <div className='w-16 h-16 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner'>
                <ChevronsRight
                  className='text-orange-1 dark:text-dark-primaryColor w-[25px]'

                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
})
MenuBook.displayName = "MenuBook"
export default MenuBook