import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LogInSchema } from "./lib/authSchemaZod"
import { getUserByEmail } from "./actions/users"
import bcryptjs from 'bcryptjs'
 
export default { 
    providers: [
        Credentials({
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          credentials: {
            email: {},
            password: {},
          },
          authorize: async (credentials) => {
            const validateFields = LogInSchema.safeParse(credentials)
             
            if(validateFields.success){
                const {email, password} = validateFields.data
                
                const user = await getUserByEmail(email)
                if(!user || !user.password) return null
                const passwordMatch = await bcryptjs.compare(password, user.password)
                if(passwordMatch) return user
            }
            return null
          },
        }),
      ],
 } satisfies NextAuthConfig