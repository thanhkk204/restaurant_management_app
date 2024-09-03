import Image from 'next/image'
import React from 'react'
import { HeadingSection } from './HeadingSection'
import { Phone } from 'lucide-react'

export const OrderTableSection = () => {
    return (
        <div className='relative w-full'>
            <div className='container'>
                <div className='py-[35px]'>
                <HeadingSection title='Book tale' desc='Open table' />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center justify-center'>
                    <div className='flex-1 flex flex-col items-center justify-center py-8 md:py-12'>
                        <h1 className='text__heading font-serif capitalize text-2xl'>
                            Monday to friday
                        </h1>
                        <p className='text__para'>
                            8:00 - 21:00
                        </p>
                    </div>

                    <div className='flex-1 flex flex-col items-center justify-center py-8 md:py-12 border-y md:border-x md:border-y-0 border-dashed border-light-textSoft dark:border-dark-textSoft'>
                        <div className='w-16 h-16 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner'>
                            <Phone
                                className='text-orange-1 dark:text-dark-primaryColor'
                            />
                        </div>
                        <p className='text-2xl font-medium leading-7 mt-[18px] text-light-text dark:text-dark-text'>
                            +84 92238894
                        </p>
                    </div>

                    <div className='flex-1 flex flex-col items-center justify-center py-8 md:py-12'>
                        <h1 className='text__heading font-serif capitalize text-2xl'>
                            Friday to sunday
                        </h1>
                        <p className='text__para'>
                            9:00 - 23:00
                        </p>
                    </div>
                    
                </div>

            </div>

            <div className='w-[250px] lg:w-[450px] absolute top-0 left-0 overflow-hidden'>
                <Image
                   className='object-cover'
                    width={550}
                    height={550}
                    alt='Order table background'
                    src={`/images/table-leaves-shape.png`}
                />
            </div>

            <div className='w-[250px] lg:w-[450px] absolute top-0 right-0 -scale-x-[1]'>
                <Image
                    width={550}
                    height={550}
                    alt='Order table background'
                    src={`/images/table-leaves-shape.png`}
                />
            </div>
            
        </div>
    )
}
