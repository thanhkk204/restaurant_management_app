import Image from 'next/image'
import React from 'react'
type Props = {
    title: string,
    desc: string
}
export const HeadingSection = ({title, desc}:Props) => {
  return (
    <div className='flex flex-col items-center justify-center'>
    <h4 className='px-2 py-2 rounded-xl shadow-xl inline-block mx-auto text-light-warning 
  dark:text-dark-warning font-medium'>
       {title}
    </h4>
    <h1 className='text__heading uppercase max-w-[350px] md:max-w-[450px] text-center py-4 md:py-6'>
        {desc}
    </h1>
    <Image
        width={150}
        height={150}
        alt='Brand image'
        src={`/images/title-shape.svg`}
    />
</div>
  )
}
