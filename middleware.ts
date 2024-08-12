import { NextRequest, NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
 
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)
 
// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  const isLoggin = !!req.auth

  console.log('route', req.nextUrl.pathname)
  console.log('login', isLoggin)
  return NextResponse.next();
})
export const config = {
    matcher: [
    // Chỉ áp dụng middleware cho các yêu cầu trang, bỏ qua các yêu cầu API
    '/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
}