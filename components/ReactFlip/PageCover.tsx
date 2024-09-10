import Image from "next/image";
import React from "react";

type CoverProps = {
    children: React.ReactNode
  }
  
const PageCover = React.forwardRef<HTMLDivElement, CoverProps>((props, ref) => {
    return (
      <div className="page page-cover overflow-hidden shadow-[15px_15px_25px_rgba(0,0,0,0.55),-15px_-15px_25px_rgba(0,0,0,0.55)]" ref={ref} data-density="hard">
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
  PageCover.displayName = "PageCover"
  export default PageCover