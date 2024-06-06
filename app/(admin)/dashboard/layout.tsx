
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

import "../../globals.css"
import Navbar from "@/components/layouts/admin/Navbar"
import Sidebar from "@/components/layouts/admin/Sidebar"
import DashboardContextProvider from "@/lib/context/DashboardContextProvider"

const popins = Poppins({
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Restaurant Dashboard",
  icons: {
    icon: "/icons/logo.png",
  },
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          popins.className
        )}
      >
        <DashboardContextProvider>
        <main className=" relative bg-light-bg text-light-text  dark:bg-dark-bg dark:text-dark-text h-screen transition ease-in-out duration-300">
          <div className="fixed w-full min-h-[250px] bg-[#11cdef] dark:bg-dark-bg "></div>
          <div className="flex">
            
             <Sidebar />
            
            <div className="w-full relative">
              <Navbar />
              <div className="px-10 my-5  ">
               {children}
              </div>
            </div>
          </div>
        </main>
        </DashboardContextProvider>
      </body>
    </html>
  )
}