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
  {
    link: '/dashboard/inventories/collections',
    icons: <Salad width={20} />,
    title: "Collections"
  },
  {
    link: '/dashboard/inventories/add_new_collection',
    icons: <Salad width={20} />,
    title: "New Collection"
  },
  {
    link: '/dashboard/inventories/add_new_category',
    icons: <Salad width={20} />,
    title: "New Category"
  },
 
]

export default function SubNavigate() {
  const path = usePathname()
    // Get values were passed in context
  const value = useDashBoardContext()
  if (!value) return
  const {sideBarColor } = value
  return (
    <div >
        <div className="bg-light-bg_2 dark:bg-dark-bg_2 flex items-center gap-3 rounded-lg min-w-[250px] px-8 py-2 overflow-x-auto no-scrollbar">
        {NavigateLink.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            style={path === item.link && !sideBarColor ? {backgroundColor: "#051139" , color: 'white'}:
            path === item.link && sideBarColor?
            {backgroundColor: sideBarColor, color: 'white'}:
            {backgroundColor: '', color: ''}
            }
            className="max-w-fit py-2 px-3 text-light-textSoft dark:text-dark-textSoft rounded-lg
          cursor-pointer  flex items-center justify-start gap-2 "
          >
            {item.icons}
            <p className="text-[18px]">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
