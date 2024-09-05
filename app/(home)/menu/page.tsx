"use client"
import FilteredProducts from "@/components/FilteredProducts"
import GoogleMap from "@/components/GoogleMap"

const menuPage = () => {
  return (
    <div className="w-full">
     {/* <section className="py-0">
      <div className="rounded-2xl overflow-hidden">
       <GoogleMap />
      </div>
     </section> */}

     <section>
      <div className="w-full flex items-center justify-between"> 
      <div className="flex-1">
      <FilteredProducts/>

      </div>
      <div className="flex-[3]">

      </div>
      </div>
     </section>
    </div>
  )
}

export default menuPage