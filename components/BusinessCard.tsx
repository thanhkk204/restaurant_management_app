"use client"
import { colorsVariables } from '@/lib/constants'


type PropsCardType = {
    title: string,
    color: string,
    value: string,
    icons: React.ReactNode
}
export default function BusinessCard({title, color, value, icons}: PropsCardType) {
  return (
    <div className={`px-4 py-3 bg-light-bg_2 dark:bg-dark-bg_2 rounded-lg cursor-pointer
     hover:translate-y-[-2%] transition-all duration-150 ease-in hover:shadow-shadown_hover hover:shadow-[#11cdef]`}>
       <div className='flex items-center justify-between'>
        <div>
          <h3 className='uppercase text-light-text dark:text-dark-text font-normal'>{title}</h3>
          <h1 className='py-1 font-bold '>{value}</h1>
        </div>

        <div 
        style={{backgroundColor: color}}
        className='w-[50px] h-[50px] rounded-full bg-blue-1 flex items-center justify-center '
        >
        {icons}
        </div>
       </div>
        <p className='py-2'><span style={{color: colorsVariables.green}}>+55%</span> since yesterday</p>
    </div>
  )
}
