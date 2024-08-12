import NextAuth from "next-auth"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { LogInSchema } from "./lib/authSchemaZod";
import client from "./lib/mongoDbClient";
import authConfig from "./auth.config"
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  ...authConfig,
})