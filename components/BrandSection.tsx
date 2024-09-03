import { Play } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { HeadingSection } from './HeadingSection'

export const BrandSection = () => {
  return (
    <section className='py-0 relative'>
        <h3 className='font-serif text-2xl opacity-85 tracking-wider text-light-text dark:text-dark-text'
        >Trusted by more 70+ companies
        </h3>

   
          <div className='py-[35px] md:py-[75px] grid  grid-cols-2 lg:grid-cols-5 gap-4'>
              {
                  [...Array(5).keys()].map(item => (
                      <Image
                          key={item} // Add key to each item for better performance
                          className='hover:brightness-75'
                          width={250}
                          height={250}
                          alt='Brand image'
                          src={`/images/brands/b${item + 1}.png`}
                      />
                  ))
              }
          </div>

          <div className='py-[35px] flex flex-col items-center justify-center'>
            <HeadingSection 
             title='About us'
             desc='Discorver our restaurant story'
            />
             
              <p className='text__para text-wrap text-justify'>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam o
               fficiis veritatis sint iure quam, quas excepturi explicabo veniam possimus distinctio cumque tempora volu
               ptas temporibus saepe assumenda similique non aliquid sunt.lorem
               fficiis veritatis sint iure quam, quas excepturi explicabo veniam possimus distinctio cumque tempora volu
               ptas temporibus saepe assumenda similique non aliquid sunt.lorem
              </p>
             
              <div className='py-6 md:py-8'>
              <Image 
                  className='object-cover rounded-3xl'
                  width={650}
                  height={650}
                  alt='Recipient'
                  src={`/images/about.jpg`}
              />
              </div>
              <Dialog>
                  <DialogTrigger>
                      <div className='w-16 h-16 dark:bg-dark-bg_2 flex items-center justify-center rounded-full shadow-main_shadow dark:shadow-button_shadow shadow-black/10 dark:shadow-blue-1 cursor-pointer active:shadow-inner'>
                          <Play
                              className='text-orange-1 dark:text-dark-primaryColor'
                          />
                      </div>
                  </DialogTrigger>
                  <DialogContent className='bg-transparent min-w-[250px] md:min-w-[750px] lg:min-w-[1000px] px-0 py-0 outline-none ring-offset-0 ring-0 overflow-hidden'>
                      <video
                          src="/videos/recipe_video.mp4"
                          controls
                          autoPlay
                          muted
                          loop
                      >
                      </video>
                  </DialogContent>
              </Dialog>

          </div>
          <Image
              className='absolute bottom-[-10%] right-[-50%] md:bottom-[-20%] md:right-[-15%] -z-10'
              width={650}
              height={650}
              alt='Recipient'
              src={`/images/mashroom.png`}
          />
    </section>
  )
}
