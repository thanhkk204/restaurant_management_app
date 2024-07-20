"use server"

import { signIn } from "@/auth"

export const LoginAction = async (values: any)=>{
   await signIn("credentials", values)
}