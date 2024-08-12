"use server"
import { signIn } from "@/auth"
import { LogInSchema, RegisterSchema } from "@/lib/authSchemaZod"
import user from "@/lib/models/user"
import { z } from "zod"
import bcryptjs from 'bcryptjs'

export const LoginAction = async (values: z.infer<typeof LogInSchema>) => {
  try {
    const validateFileds = LogInSchema.safeParse(values)
    if (!validateFileds.success)  return { error: 'Invalid field' }
    const {email, password} = validateFileds.data
    await signIn("credentials", {
      email,
      password,
      redirectTo: "http://localhost:5555/"
    })
    return {success: "Successfully"}
  } catch (error) {
    console.log({error})
    return { error: "Some thing went wrong" }
  }
}

export const RegisterAction = async (values: z.infer<typeof RegisterSchema>) =>{
  try {
    const validateFileds = RegisterSchema.safeParse(values)
    if (!validateFileds.success)  return { error: 'Invalid field' }
    const {email, password, userName} = validateFileds.data
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const isSuccess = await user.create({
      email,
      userName,
      password: hashPassword
    })
    if(!isSuccess) return {error: "Can't register"}
    return {success: "Successfully"}
  } catch (error) {
    return { error: "Some thing went wrong" }
  }
}