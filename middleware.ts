import { NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { apiAuthPrefix, authenRoutes, publicRoutes } from "./route"
import { redirect } from 'next/navigation'
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  const {nextUrl} = req
  const isLoggin = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthenRoute = authenRoutes.includes(nextUrl.pathname)
  if(isApiAuthRoute){
    return NextResponse.next()
  }

  if(isAuthenRoute){
    if(isLoggin){
      return NextResponse.redirect(new URL("/", req.url), {
          status: 303,
        });
    }
  }
  console.log({isPublicRoute, isLoggin})

  if(isPublicRoute){
     if(!isLoggin) {
      return NextResponse.redirect(new URL('/login', nextUrl))
     }
  }
  return NextResponse.next()
})
export const config = {
    matcher: [
    // Chỉ áp dụng middleware cho các yêu cầu trang, bỏ qua các yêu cầu API
    '/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
}