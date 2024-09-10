import { useCart } from '@/lib/context/CartProvider'
import { formatCurrency } from '@/lib/utils'
import { CartItem, FilteredProductType } from '@/types/type'
import Image from 'next/image'
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaCartPlus } from 'react-icons/fa'

const PageProduct = ({filteredProducts}: {filteredProducts: FilteredProductType[]}) => {
      // add to cart action
  const { addItem } = useCart()
  const handleAddToCart = (item: CartItem) => {
    addItem(item)
  }
  return (
    <>
          {/* For destop Page */}
          <div className="w-full hidden md:flex flex-wrap items-center justify-center gap-5 ">
              {
                  filteredProducts.map(dish => (
                      <div key={dish._id} className="w-[280px] min-w-[280px] min-h-[280px] rounded-3xl shadow-[3px_3px_5px_rgba(0,0,0,0.25),-3px_-3px_5px_rgba(0,0,0,0.25)] bg-transparent border border-black/35 overflow-hidden">
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
                      </div>
                    
                   ))
                 }
              </div>
              {/* For mobile Page */}
              <div className="flex md:hidden flex-col gap-5">
                {
                  filteredProducts.map(dish=>(
                    <div key={dish._id} className="flex items-center gap-3">
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
                    </div>
                  ))
                }
              </div>
    </>
  )
}

export default PageProduct