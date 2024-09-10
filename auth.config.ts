import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LogInSchema } from "./lib/authSchemaZod"
import bcryptjs from 'bcryptjs'
 

export default { 
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        // authorization: {
        //   params: {
        //     prompt: 'select_account', // yêu cầu người dùng chọn lại tài khoản
        //   },
        // },
      }),
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: 'select_account', // yêu cầu người dùng chọn lại tài khoản
          },
        },
      }),
        Credentials({
          authorize: async (credentials) => {
            const validateFields = LogInSchema.safeParse(credentials)
            
            if(validateFields.success){
                const {email, password} = validateFields.data
               
                if(!email || !password) return null
                try {
                  const res = await fetch(`${process.env.BASE_URL}/api/userVerify`,{
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email})
                  })
                  if(!res.ok) return null
                  const user = await res.json()
                  console.log({user})
                  if(!user || !user.password) return null
                  const passwordMatch = await bcryptjs.compare(password, user.password)
                  if(passwordMatch) return {
                    id: user._id,
                    email: user.email,
                    name: user.name
                  }
                } catch (error) {
                  return null
                }
            }
            return null
           
          },
        }),

        
      ],
      secret: process.env.AUTH_SECRET,
 } satisfies NextAuthConfig