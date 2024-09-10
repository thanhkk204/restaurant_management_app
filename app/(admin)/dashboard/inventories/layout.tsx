import SubNavigate from "@/components/layouts/admin/SubNavigate"
import { Book, CookingPot, LibraryBig } from "lucide-react"

const NavigateLink = [
  {
    link: '/dashboard/inventories',
    icons: <CookingPot width={20} />,
    title: "Dishes"
  },
  {
    link: '/dashboard/inventories/collections',
    icons: <LibraryBig width={20} />,
    title: "Collections"
  },
  {
    link: '/dashboard/inventories/categories',
    icons: <Book width={20} />,
    title: "Categories"
  },
]
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col lg:py-5 lg:px-5 md:gap-5  bg-light-bg_2 dark:bg-transparent rounded-lg">
      <SubNavigate NavigateLink={NavigateLink} />
      {children}
    </div>
  )
}
