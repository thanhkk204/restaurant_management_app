"use client"
import Link from 'next/link'
import { useState } from 'react';

export default function page() {
  const [showShippingForm, setShowShippingForm] = useState(false);
  return (
    <section className='w-full px-3 py-3 min-h-[80vh] mx-auto shadow-button_shadown shadow-slate-600 rounded-md mt-12'>
     <div className="relative overflow-hidden h-96 w-full">
      <div className="sticky top-0 left-0 right-0 flex justify-between p-4">
        <button
          onClick={() => setShowShippingForm(false)}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          Reservation 
        </button>
        <button
          onClick={() => setShowShippingForm(true)}
          className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer "
        >
          Shipping 
        </button>
      </div>
      <div className="relative w-full h-full">
        <div
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
            showShippingForm ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <ReservationForm />
        </div>
        <div
          className={`absolute top-0 right-0 w-full h-full transition-transform duration-500 ${
            showShippingForm ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <ShippingForm />
        </div>
      </div>
    </div>
    </section>
  )
}

const ReservationForm = () => (
  <div className="flex items-center justify-center h-full bg-gray-100">
    <h2 className="text-2xl">Reservation Form</h2>
  </div>
);

const ShippingForm = () => (
  <div className="flex items-center justify-center h-full bg-gray-200">
    <h2 className="text-2xl">Shipping Form</h2>
  </div>
);