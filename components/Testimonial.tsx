import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { HeadingSection } from './HeadingSection'

export const Testimonial = () => {
  return (
    <div className='relative w-full'>
   <section id='blogSection'>
    <div className='pb-5 md:pb-8'>
       <HeadingSection title='What they say' desc='What customers say about our restaurant' />
    </div>
    <div className='w-full flex flex-col xl:flex-row items-center gap-5'>
    <div className='flex-1 overflow-hidden'>
        <Image
         src={"/images/testimonial-img.png"}
         alt='testimonial'
         width={550}
         height={550}
         className='object-cover w-full h-full'
        />
    </div>

     <div className='flex-1 px-0 md:px-5 pt-[55px] xl:py-0 grid grid-cols-1 md:grid-cols-2 gap-y-[65px] gap-x-8'>
        <div data-aos="flip-left" data-aos-offset="-520"  className='min-w-[300px] max-w-[350px] relative px-5 py-3 rounded-2xl product_shadow dark:product_shadow_dark 
        mx-auto transition-all duration-300 hover:scale-105 ease-in cursor-pointer'>
            <div className='absolute w-[100px] h-[100px] rounded-full top-0 left-5 translate-y-[-50%] overflow-hidden'>
                <Image
                  alt='testimonial avatar'
                  src={"/images/testimonial/t1.jpg"}
                  height={100}
                  width={100}
                  className='object-cover'
                />
            </div>
            <div className='flex gap-1 items-center justify-end py-2 my-0'>
              {([...Array(5).keys()]).map(item=>(
                <Star 
                key={item}
                 className='text-light-warning dark:text-dark-warning '
                />
              ))}
            </div>

            <h2 className='text__heading font-serif text-2xl text-light-text dark:text-dark-text pt-5 bg-transparent dark:bg-transparent'>
               User&apos; Name
            </h2>

            <p className='text__para text-wrap truncate py-1 my-0'>
              Lorem ipsum, dolor sit amet consectetur dolorum omnisorum ipsum. Incidunt.
            </p>
        </div>
        <div data-aos="flip-left" data-aos-offset="-480" className='min-w-[300px] max-w-[350px] relative px-5 py-3 rounded-2xl product_shadow dark:product_shadow_dark 
        mx-auto transition-all duration-300 hover:scale-105 ease-in cursor-pointer'>
            <div className='absolute w-[100px] h-[100px] rounded-full top-0 left-5 translate-y-[-50%] overflow-hidden'>
                <Image
                  alt='testimonial avatar'
                  src={"/images/testimonial/t2.jpg"}
                  height={100}
                  width={100}
                  className='object-cover'
                />
            </div>
            <div className='flex gap-1 items-center justify-end py-2 my-0'>
              {([...Array(5).keys()]).map(item=>(
                <Star 
                key={item}
                 className='text-light-warning dark:text-dark-warning '
                />
              ))}
            </div>

            <h2 className='text__heading font-serif text-2xl text-light-text dark:text-dark-text pt-5 bg-transparent dark:bg-transparent'>
               User&apos; Name
            </h2>

            <p className='text__para text-wrap truncate py-1 my-0'>
              Lorem ipsum, dolor sit amet consectetur dolorum omnisorum ipsum. Incidunt.
            </p>
        </div>
        <div data-aos="flip-left" data-aos-offset="-440"  className='min-w-[300px] max-w-[350px] relative px-5 py-3 rounded-2xl product_shadow dark:product_shadow_dark 
        mx-auto transition-all duration-300 hover:scale-105 ease-in cursor-pointer'>
            <div className='absolute w-[100px] h-[100px] rounded-full top-0 left-5 translate-y-[-50%] overflow-hidden'>
                <Image
                  alt='testimonial avatar'
                  src={"/images/testimonial/t3.jpg"}
                  height={100}
                  width={100}
                  className='object-cover'
                />
            </div>
            <div className='flex gap-1 items-center justify-end py-2 my-0'>
              {([...Array(5).keys()]).map(item=>(
                <Star 
                key={item}
                 className='text-light-warning dark:text-dark-warning '
                />
              ))}
            </div>

            <h2 className='text__heading font-serif text-2xl text-light-text dark:text-dark-text pt-5 bg-transparent dark:bg-transparent'>
               User&apos; Name
            </h2>

            <p className='text__para text-wrap truncate py-1 my-0'>
              Lorem ipsum, dolor sit amet consectetur dolorum omnisorum ipsum. Incidunt.
            </p>
        </div>
        <div data-aos="flip-left" data-aos-offset="-400"  className='min-w-[300px] max-w-[350px] relative px-5 py-3 rounded-2xl product_shadow dark:product_shadow_dark 
        mx-auto transition-all duration-300 hover:scale-105 ease-in cursor-pointer'>
            <div className='absolute w-[100px] h-[100px] rounded-full top-0 left-5 translate-y-[-50%] overflow-hidden'>
                <Image
                  alt='testimonial avatar'
                  src={"/images/testimonial/t4.jpg"}
                  height={100}
                  width={100}
                  className='object-cover'
                />
            </div>
            <div className='flex gap-1 items-center justify-end py-2 my-0'>
              {([...Array(5).keys()]).map(item=>(
                <Star 
                key={item}
                 className='text-light-warning dark:text-dark-warning '
                />
              ))}
            </div>

            <h2 className='text__heading font-serif text-2xl text-light-text dark:text-dark-text pt-5 bg-transparent dark:bg-transparent'>
               User&apos; Name
            </h2>

            <p className='text__para text-wrap truncate py-1 my-0'>
              Lorem ipsum, dolor sit amet consectetur dolorum omnisorum ipsum. Incidunt.
            </p>
        </div>
       
     </div>
    </div>
   </section>
         
    </div>
  )
}
