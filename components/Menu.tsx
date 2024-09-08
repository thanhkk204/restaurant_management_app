"use client"
import { CategoryType } from "@/app/(admin)/dashboard/inventories/categories/page"
import { cn } from "@/lib/utils"
import { FilteredProductType } from "@/types/type"
import Image from "next/image"
import React, { forwardRef, useCallback, useEffect, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import { v4 as uuidv4 } from 'uuid';
type CoverProps = {
  children: React.ReactNode
}
type PageProps = {
  children: React.ReactNode
  number: string
  currentPage: number
}
const PageCover = React.forwardRef<HTMLDivElement, CoverProps>((props, ref) => {
  
  return (
    <div className="page page-cover overflow-hidden page_shadow" ref={ref} data-density="hard">
      <Image
       alt="book cover"
       src={'/images/book_cover.jpg'}
       width={1100}
       height={970}
       className="object-contain"
      />
      <div className="page-content absolute">
        {props.children}
      </div>
    </div>
  );
});
const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const [pageIndex, setPageIndex] = useState<number>()
  const id = uuidv4();
  useEffect(()=>{
   let uuid = document.getElementById(id) as HTMLDivElement
   const parent = uuid?.parentNode as HTMLDivElement

  // Lấy tất cả các phần tử con của parent
  const children = Array.from(parent.children);
  const index = children.indexOf(uuid);
  setPageIndex(index)

  },[])
  return (
    <div 
    id={id}
    className={cn(
      "demoPage p-10 bg-light-bg_2 dark:bg-dark-bg_2 page_shadow overflow-scroll",
      props.currentPage + 1 == pageIndex ? "page_shadown_inner_right" : "",
      props.currentPage == pageIndex ? "page_shadown_inner_left" : "",
      
    )}  ref={ref}
    >
      {/* ref required */}
      <h1>Page Header</h1>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
      <p>Current page</p>
      <p>{props.currentPage}</p>
      <p> Page</p>
      <p>{pageIndex}</p>
    </div>
  )
})

type MenuBookProps = {
    filteredProducts: FilteredProductType[]
    dishes: FilteredProductType[] | null
}
const MenuBook = forwardRef<HTMLDivElement, MenuBookProps>((props, ref) => {
   const {filteredProducts, dishes} = props
   const [productPerPage, setProductPerPage] = useState<number>(2)
  

// Hàm tách sản phẩm theo category
const groupByCategory = (dishes: FilteredProductType[] | null) => {
    if(dishes === null) return null
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

  if(dishes){
  }
  const groupedProducts = groupByCategory(dishes)
  const [page, setCurrentPage] = useState<number>(0)
  let pageIndex = 1;
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
          minWidth={585}
          maxWidth={1033}
          minHeight={733}
          maxHeight={1533}
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
          onFlip={(e) => setCurrentPage(ref?.current.pageFlip().getCurrentPageIndex())}
          onChangeOrientation={()=>{}}
          onChangeState={(e)=>{}}
          className="demo-book"
          ref={ref}
        >
          <PageCover>
            <div className="absolute"></div>
          </PageCover>
          {
           filteredProducts && [...Array(2).keys()].map((currentPage, index)=>(
             <Page number="All" currentPage={page}>
              <div className="w-full h-full ">
              {currentPage}
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam temporibus libero minima in
                 facilis nostrum eius! Illum, incidunt nostrum? Voluptas rem earum
                 nobis fugit recusandae praesentium! Veritatis temporibus perspiciatis molestiae.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam temporibus libero minima in
                 facilis nostrum eius! Illum, incidunt nostrum? Voluptas rem earum
                 nobis fugit recusandae praesentium! Veritatis temporibus perspiciatis molestiae.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam temporibus libero minima in
                 facilis nostrum eius! Illum, incidunt nostrum? Voluptas rem earum
                 nobis fugit recusandae praesentium! Veritatis temporibus perspiciatis molestiae.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam temporibus libero minima in
                 facilis nostrum eius! Illum, incidunt nostrum? Voluptas rem earum
                 nobis fugit recusandae praesentium! Veritatis temporibus perspiciatis molestiae.
              </div>
              </div>
              {pageIndex + 1}
             </Page>
            ))
          }
          {
            groupedProducts !== null && Object.keys(groupedProducts).map((category, indexCate) => {
              const num = Math.ceil(groupedProducts[category].length / productPerPage)
              //  minimum 2 pages
              const pageNumber = num >= 3 ? num : 2
              //  console.log({category, number})
              return [...Array(pageNumber).keys()].map((currentPage, indexPage) => (
                <Page number={category}  currentPage={page}>
                  {groupedProducts[category].map((product, index) => {
                    // find where the page start and the page end
                    return (index >= currentPage * productPerPage && index < (currentPage + 1) * productPerPage) ?
                      (<div>
                        <span>{index + 1}</span>
                        <p>{product.title}</p>
                      </div>) : <div></div>

                  })}
                </Page>
              ))
            })
          }
        </HTMLFlipBook>
      </div>
    </>
  )
})

export default MenuBook