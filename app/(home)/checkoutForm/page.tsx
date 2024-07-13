"use client"
import CartTable from '@/components/custom_ui/CartTable';
import { useCart } from '@/lib/context/CartProvider';
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
          className="w-full h-full bg-blue-500 text-white  cursor-pointer"
        >
          Reservation 
        </button>
        <button
          onClick={() => setShowShippingForm(true)}
          className=" w-full h-full bg-green-500 text-white  cursor-pointer"
        >
          Shipping 
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
          <ReservationForm />
        </div>
        <div
          className={`w-full h-full absolute top-0 left-0  transition-transform duration-500 ${
            showShippingForm ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ShippingForm />
        </div>
      </div>
      </div>

      <div className='flex-1 bg-light-bg_2 dark:bg-dark-bg_2 text-light-text dark:text-white py-2'>
       <CartTable orderedFoods={cart} />
      </div>
      </div>
     
    </div>
    </section>
  )
}

const ReservationForm = () => (
  <div className="flex items-center justify-center h-full bg-transparent dark:bg-transparent">
    <h2 className="text-2xl">Reservation Form</h2>
  </div>
);

const ShippingForm = () => (
  <div className="flex items-center justify-center h-full bg-transparent dark:bg-transparent">
    <h2 className="text-2xl">Shipping Form</h2>
  </div>
);