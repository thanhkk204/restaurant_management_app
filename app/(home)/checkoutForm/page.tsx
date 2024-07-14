"use client"
import CartTable from '@/components/custom_ui/CartTable';
import ReservationCheckoutForm from '@/components/custom_ui/checkout/ReservationCheckoutForm';
import ShipmentCheckoutForm from '@/components/custom_ui/checkout/ShipmentCheckoutForm';
import { useCart } from '@/lib/context/CartProvider';
import { cn } from '@/lib/utils';
import { ReceiptText, Truck } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react';

export default function page() {
  const [showShippingForm, setShowShippingForm] = useState(false);
  const { cart} = useCart();
  return (
    <section className='w-full mx-auto shadow-button_shadown shadow-slate-600 rounded-md overflow-hidden'>
     <div className="relative h-fit lg:h-[90vh] w-full">
      
      <div className="w-full h-[50px] sticky top-0 left-0 right-0 flex justify-between">
        <button
          onClick={() => setShowShippingForm(false)}
          className={cn(
            "w-full h-full text-light-text dark:text-dark-text transition-colors duration-200 ease-in-out cursor-pointer text-lg font-medium",
            showShippingForm ? 'bg-transparent' : 'bg-gray-1 text-white'
          )}
        >
          <div className="flex items-center gap-2 justify-center">
          <ReceiptText />
          Reservation 
          </div>
        </button>
        <button
          onClick={() => setShowShippingForm(true)} 
          className={cn(
            "w-full h-full text-light-text dark:text-dark-text transition-colors duration-200 ease-in-out cursor-pointer text-lg font-medium",
            !showShippingForm ? 'bg-transparent' : 'bg-gray-1 text-white'
          )}
        >
          <div className="flex items-center gap-2 justify-center">
          <Truck />
          Shipping 
          </div>
          
        </button>
      </div>

      <div className='w-full h-full flex flex-col lg:flex-row'>
      <div className='flex-[2] overflow-hidden'>
      <div className="relative w-full h-full">
        <div
          className={`w-full absolute top-0 left-0 h-full transition-transform duration-500 ${
            showShippingForm ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className='w-full px-3 py-3 md:px-5 md:py-4 text-light-text dark:text-dark-text'>
          <ReservationCheckoutForm />
          </div>
        </div>
        <div
          className={`w-full h-full absolute top-0 left-0  transition-transform duration-500 ${
            showShippingForm ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ShipmentCheckoutForm />
        </div>
      </div>
      </div>

      <div className='flex-1 bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-white py-2 rounded-tl-md rounded-bl-md'>
       <CartTable orderedFoods={cart} />
      </div>
      </div>
     
    </div>
    </section>
  )
}

