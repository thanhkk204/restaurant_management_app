"use client"
import { useDashBoardContext } from '@/lib/context/DashboardContextProvider'
import { AppWindow, Salad } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const NavigateLink = [
  {
    link: '/dashboard/inventories',
    icons: <AppWindow width={20} />,
    title: "Category"
  },
  {
    link: '/dashboard/inventories/dishes',
    icons: <Salad width={20} />,
    title: "Dishes"
  },
]

export default function Sidebar2() {
  const path = usePathname()
    // Get values were passed in context
  const value = useDashBoardContext()
  if (!value) return
  const { toggleSideBar2, setToggleSideBar2, sideBarColor } = value

  const toggleSideBar: any= (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    setToggleSideBar2(false)
  }
  const handleClickNavigation: any = (e: MouseEvent)=>{
    e.preventDefault()
    e.stopPropagation()
  }
  console.log(sideBarColor);
  
  return (
    <div>
        {
         toggleSideBar2 && (
         <div 
         onClick={toggleSideBar}
         className='bg-blur_bg md:bg-transparent md:bg-none w-full h-screen fixed z-20 top-0 left-0 '
         >
         <div className='absolute md:relative left-0 top-[50%] md:top-0 translate-y-[-50%] '>
           <div className='flex flex-col '>
             <div
              onClick={handleClickNavigation}
              className='w-[200px]'
              >
               thanh
             </div>
             <div className='w-[200px]'>
               thanh
             </div>
             <div className='w-[200px]'>
               thanh
             </div>
           </div>
         </div>
        </div>
         )
        }

        <div className="bg-light-bg_2 dark:bg-dark-bg_2 flex flex-col items-center justify-center min-w-[250px] px-4 py-3 rounded-md">
        {NavigateLink.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            style={path === item.link && !sideBarColor ? {backgroundColor: "#051139" , color: 'white'}:
            path === item.link && sideBarColor?
            {backgroundColor: sideBarColor, color: 'white'}:
            {backgroundColor: '', color: ''}
            }
            className="w-full py-4 px-3 text-light-textSoft dark:text-dark-textSoft rounded-lg
          cursor-pointer  flex items-center justify-start gap-2"
          >
            {item.icons}
            <p className="text-[18px]">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
