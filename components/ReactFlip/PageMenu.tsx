import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
type PageProps = {
    children: React.ReactNode
    category: string
    currentPage: number
  }
const PageMenu = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    const [pageIndex, setPageIndex] = useState<number>()
    const id = uuidv4();
    useEffect(()=>{
     let uuid = document.getElementById(id) as HTMLDivElement
     const parent = uuid?.parentNode as HTMLDivElement
  
    // Lấy tất cả các phần tử con của parent
    const children = Array.from(parent.children);
    const index = children.indexOf(uuid);
    setPageIndex(index)
  
    },[id])
    return (
      <div 
      id={id}
      className={cn(
        "demoPage px-8 lg:px-16 bg-light-bg_2 dark:bg-dark-bg_2 page_shadow ",
        props.currentPage + 1 == pageIndex ? "page_shadown_inner_right" : "",
        props.currentPage == pageIndex ? "page_shadown_inner_left" : "",
        
      )}  ref={ref}
      >
        {/* Cover */}
        <div className={"absolute top-0 left-0 -z-10 w-full h-full bg-[url('/images/bg_page_decor.jpg')] bg-cover bg-no-repeat bg-center page_shadow"}
        >
        </div>
        {/* content */}
        <div className="w-full h-full py-5 overflow-y-scroll dark:text-light-text">
        <h1 className="text__heading w-full text-center text-nowrap pt-8 pb-4 uppercase font-serif dark:text-light-text">{props.category}</h1>
          <div>
          {props.children}
          </div>
        </div>
      </div>
    )
  })
  PageMenu.displayName = "PageMenu"
  export default PageMenu