"use client"
import { Home, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

const CompletedBill = ({params}: {params:{invoice_id: string}})=>{

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <section className='w-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md px-3 py-4'>
      <div ref={contentToPrint} className='mx-auto max-w-[794px] bg-light-bg dark:bg-dark-bg rounded-md px-3'>
        {/* Header bill */}
          <div className='w-full flex justify-center'>
              <div className='max-w-[200px] max-h-[160px] overflow-hidden'>
               <Image width={200} height={200} alt='Logo' src={"/images/logo2.png"} className='object-cover' />
              </div>
               <div className="py-3">
            <div className="w-full flex flex-col items-center justify-center px-5">
              <h2 className="dark:text-dark-text text-[36px] font-medium font-serif">Visit Us</h2>
               <div className="flex items-start py-2">
                <MapPin className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                 <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                  Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội
                 </p>
               </div>

               <div className="flex items-start py-2">
                <Home className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                 <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                  Open 9:30 am - 11h30 pm
                 </p>
               </div>

               <div className="flex items-start py-2">
                <Mail className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                 <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                   thanhKT285@gmail.com
                 </p>
               </div>
            </div>
          </div>
          </div>
          {/* Body */}
          <div className="border-double border-b-4 border-sky-500 my-4"></div>
          <div className='flex justify-between'>
              <div className='flex gap-8 max-w-[390px]'>
              <h1 className='min-w-fit text-[20px]'>Bill to</h1>
              <div className='flex flex-col'>
                 <p className='text-light-textSoft dark:text-dark-textSoft font-thin pb-2'>
                  Tên:   
                  <span
                  className='text-light-text dark:text-dark-text font-medium px-3'
                  >Thanh</span>
                 </p>
                 <p className='text-light-textSoft dark:text-dark-textSoft font-thin pb-2'>
                  Địa chỉ:   
                  <span
                  className='text-light-text dark:text-dark-text font-medium px-3'
                  >Thôn từ đài, xã Chuyên ngoại, huyện Duy tiên, tỉnh Hà nam</span>
                 </p>
                 <p className='text-light-textSoft dark:text-dark-textSoft font-thin pb-2'>
                  Email:   
                  <span
                  className='text-light-text dark:text-dark-text font-medium px-3'
                  >Saibattu3kk@gmail.com</span>
                 </p>
              </div>
              </div>

              <div className='flex flex-col min-w-[200px]'>
                 <div className='w-full flex items-center justify-between pb-2'>
                  <p className='text-light-textSoft dark:text-dark-textSoft font-thin'>Ngày:</p>
                  <p>30/4/2024</p>
                 </div>
                 <div className='w-full flex items-center justify-between pb-2'>
                  <p className='text-light-textSoft dark:text-dark-textSoft font-thin'>Giờ:</p>
                  <p>19:20</p>
                 </div>
                 <div className='w-full flex items-center justify-between pb-2'>
                  <p className='text-light-textSoft dark:text-dark-textSoft font-thin'>Bàn:</p>
                  <p>Bàn số 1</p>
                 </div>
              </div>

          </div>
      </div>
      <button onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}>
        PRINT
      </button>
    </section>
  )
}
export default CompletedBill
