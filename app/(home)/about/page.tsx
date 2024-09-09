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
{/* Filter desktop */}
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