import NextAuth from "next-auth"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/mongoDbClient"
import authConfig from "./auth.config"
import { getUserByEmail, getUserById, UpdateFieldUser } from "./actions/users"
import User from "./lib/models/user"
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/authError",
  },
  events: {
    async linkAccount({ user }) {
      await User.findByIdAndUpdate(user.id, { emailVerified: new Date() })
    },
  },
  callbacks: {
     async signIn({ user, account}) {
        if(account?.provider !== 'credentials') return true
       
        // Check if email verified
        if(!user.email) return false
        const existingUser = await getUserByEmail(user.email)
        if(!existingUser.emailVerified) return false

      // Cho cập nhật đầy đủ thông tin user
      // if (account?.provider !== "credentials" && account) {
      //   await UpdateFieldUser(user , account)
      // }

      return true
    },
    async session({ session, token }) {
      if (!token || !session) return session
      session.user.role = token.role
      session.user.id = token.sub
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token?.sub)
      token.role = existingUser.role
      return token
    },
  },
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  ...authConfig,
})
