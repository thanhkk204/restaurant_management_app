import { Coins, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import GoogleMap from './GoogleMap'

const MapSection = () => {
  return (
    <section className="py-0 overflow-hidden">
          <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
            <div className="order-2 lg:order-1 lg:flex-1  rounded-2xl overflow-hidden w-[350px] sm:w-[450px] md:w-[650px] h-[350px] sm:h-[450px] lg:h-[550px]  flex items-center justify-center">
              <GoogleMap />
            </div>

            <div className="flex-1 h-full order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-5 md:gap-8">
                {/* 1 box */}
                <div data-aos="fade-right" className="relative bg-white/90 text-light-text rounded-[30px] min-w-[180px] h-[200px] w-full md:h-[250px] py-4 px-3 flex flex-col items-center mx-auto shadow-[inset_10px_10px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.15)]">
                   <div className="animate-bounce min-w-12 min-h-12 rounded-full flex items-center justify-center bg-light-primaryColor dark:bg-dark-primaryColor text-white ">
                    <span className="inline-flex w-12 h-12 rounded-full animate-ping absolute bg-light-primaryColor dark:bg-dark-primaryColor duration-1500">

                    </span>
                    <MapPin />
                   </div>
                   <h1 className="text-light-text uppercase text-xl tracking-wide font-bold text-nowrap leading-7 pb-2 pt-4">Location</h1>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà nội
                   </p>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden 
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    Từ Đài, Chuyên Ngoại, Duy Tiên, Hà Nam
                   </p>
                </div>
                {/* 1 box */}
                <div data-aos="fade-left" className="relative bg-white/90 text-light-text rounded-[30px] min-w-[180px] h-[200px] w-full md:h-[250px] py-4 px-3 flex flex-col items-center mx-auto shadow-[inset_10px_10px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.15)]">
                   <div className="min-w-12 min-h-12 rounded-full flex items-center justify-center bg-light-secondaryColor dark:bg-dark-secondaryColor text-white ">
                    <span className="inline-flex w-12 h-12 rounded-full animate-ping absolute bg-light-secondaryColor dark:bg-dark-secondaryColor duration-1500">

                    </span>
                   <Phone />
                   </div>
                   <h1 className="text-light-text uppercase text-xl tracking-wide font-bold text-nowrap leading-7 pb-2 pt-4">Phone Number</h1>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    +84 92238894
                   </p>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden 
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    +84 113114115
                   </p>
                </div>
                {/* 1 box */}
                <div data-aos="fade-right" className="relative bg-white/90 text-light-text rounded-[30px] min-w-[180px] h-[200px] w-full md:h-[250px] py-4 px-3 flex flex-col items-center mx-auto shadow-[inset_10px_10px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.15)]">
                   <div className="min-w-12 min-h-12 rounded-full flex items-center justify-center bg-light-warning dark:bg-dark-warning text-white ">
                    <span className="inline-flex w-12 h-12 rounded-full animate-ping absolute bg-light-warning dark:bg-dark-warning duration-1500">

                    </span>
                    <Coins />
                   </div>
                   <h1 className="text-light-text uppercase text-xl tracking-wide font-bold text-nowrap leading-7 pb-2 pt-4">Faxx</h1>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    1-2345-678900
                   </p>
                </div>
                {/* 1 box */}
                <div data-aos="fade-left" className="relative bg-white/90 text-light-text rounded-[30px] min-w-[180px] h-[200px] w-full md:h-[250px] py-4 px-3 flex flex-col items-center mx-auto shadow-[inset_10px_10px_10px_rgba(0,0,0,0.15),5px_5px_10px_rgba(0,0,0,0.15)]">
                   <div className="min-w-12 min-h-12 rounded-full flex items-center justify-center bg-light-success dark:bg-dark-success text-white ">
                    <span className="inline-flex w-12 h-12 rounded-full animate-ping absolute bg-light-success dark:bg-dark-success duration-1500">

                    </span>
                    <Mail />
                   </div>
                   <h1 className="text-light-text uppercase text-xl tracking-wide font-bold text-nowrap leading-7 pb-2 pt-4">Email</h1>
                   <p className=" w-full text_para my-0 text-[15px] leading-5 text-center overflow-hidden
                   truncate md:overflow-visible md:break-all md:text-wrap capitalize">
                    thanhhuyle2805@gmail.com
                   </p>
                </div>
              </div>
            </div>

          </div>

        </section> 
  )
}

export default MapSection