"use client"
import { motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react'
import React from 'react'

const SubcribeSection = () => {
  const SendIcon = motion(SendHorizontal);
  return (
    <div className='container' >
        <div className='mx-auto max-w-[750px] flex flex-col items-center px-10 py-12 rounded-3xl bg-[url("/images/news.jpg")] bg-center bg-cover backdrop-blur-2xl shadow-2xl'>
            <h1 className='text__heading text-dark-text text-[30px] md:text-[35px] lg:text-[45px] font-serif text-nowrap capitalize'>
                Subcribe our newsletter
            </h1>

            <p className='text__para text-center text-dark-text'
            >
                Lorem ipsum dolor sit amet  tenetur nobis aut deserunt, unde quaerat quidem eos nam illo. Sint, magni tenetur?
            </p>

            <form className='w-full rounded-3xl relative my-4 md:my-5 btnCustom dark:btnCustom_dark'>
                <input type="text" 
                 className='w-full py-3 md:py-4 text-xl text-dark-text bg-transparent dark:bg-transparent outline-none border-none placeholder:text-dark-text'
                 placeholder='Enter your mail'
                />
                <motion.button 
                onClick={e=> e.preventDefault()}
                className='h-full absolute right-0 top-[50%] translate-y-[-50%] rounded-3xl py-3 px-6'
                initial={'initial'}
                whileHover="hover"
                animate={'initial'}
                >
                  <SendIcon 
                  variants={{
                    initial: { rotate: 0, x: 0, y: 0, opacity: 1 },
                    hover: {
                      rotate: -45,
                      x: 100,  // Di chuyển theo trục X (sang phải)
                      y: -100, // Di chuyển theo trục Y (lên trên)
                      opacity: 0,
                      transition: {
                        rotate: { duration: 1 }, // Quay 45 độ trong 1 giây
                        x: { delay: 1, duration: 0.3 }, // Di chuyển chéo lên phải trong 0.3 giây sau khi quay xong
                        y: { delay: 1, duration: 0.3 }, // Đồng bộ với chuyển động X
                        opacity: { delay: 1, duration: 0.3 },
                      },
                    },
                  }}
                   className= 'outline-none border-none glowing dark:glowing '
                  width={35}
                  height={35}
                  />
                </motion.button>
            </form>
        </div>
    </div>
  )
}

export default SubcribeSection