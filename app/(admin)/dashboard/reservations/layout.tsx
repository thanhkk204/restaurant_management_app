import SubNavigate from '@/components/layouts/admin/SubNavigate'
import { MapPinned } from 'lucide-react'

const NavigateLink = [
  {
    link: '/dashboard/reservations',
    icons: <MapPinned width={20} />,
    title: "Tables"
  },
]

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <section className="w-full flex flex-col py-2 md:py-5 px-5 gap-0 md:gap-10 ">
    <SubNavigate NavigateLink={NavigateLink}/>
    {children}
  </section>
  )
}
