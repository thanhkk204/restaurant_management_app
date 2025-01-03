
import "../globals.css"
import { Metadata } from "next"
import { Poppins } from "next/font/google"
import ThemeContextProvider from "@/lib/context/ThemeContextProvider"
import { CartProvider } from "@/lib/context/CartProvider"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { auth, signOut } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { Footer } from "@/components/Footer"
import NavbarHome from "@/components/layouts/home/Navbar"

const popins = Poppins({
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Golden Folk",
  icons: {
    icon: "/images/logo2.png",
  },
  description: "Generated by create next app",
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeContextProvider>
      <SessionProvider> 
        <CartProvider>
      <body className={cn(
        "w-full bg-light-bg dark:bg-dark-bg transition-colors ease-in-out duration-300",
        popins.className
      )}>
        <NavbarHome/>

       <main className="w-full min-h-screen relative ">
       
        {children}
       </main>
        <Footer />
       <Toaster />
      </body>
      </CartProvider>
      </SessionProvider>
      </ThemeContextProvider>
    </html>
  )
}
