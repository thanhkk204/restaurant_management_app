"use server"
import { signIn } from "@/auth"
import { LogInSchema, RegisterSchema, resetPasswordSchema } from "@/lib/authSchemaZod"
import user from "@/lib/models/user"
import { z } from "zod"
import bcryptjs from "bcryptjs"
import { AuthError } from "next-auth"
import { generationVerificationToken } from "./tokens/verificationToken"
import { getUserByEmail } from "./users"
import { resetPasswordTokenSendEmail, verificationTokenSendEmail } from "./tokens/tokenSendEmail"
import { getResetPasswordTokenbyEmail, getResetPasswordTokenbyToken } from "./tokens"
import resetPasswordToken from "@/lib/models/resetPasswordToken"
import { generationResetPasswordToken } from "./tokens/resetPasswordToken"

export const LoginAction = async (values: z.infer<typeof LogInSchema>) => {
  try {
    const validateFileds = LogInSchema.safeParse(values)
    if (!validateFileds.success) return { error: "Invalid field!" }
    const { email, password } = validateFileds.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser.emailVerified) {
      const verificationToken = await generationVerificationToken(email)

      if (!verificationToken)
        return { error: "Can't generate verification token" }

      const sendSuccessfull = await verificationTokenSendEmail(
        email,
        verificationToken.token
      )
      if (!sendSuccessfull) return { error: "Can't send token to your mail" }
      return { success: "Token was sent for verification" }
    }
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    return { success: "Successfully" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        case "AccessDenied":
          return { error: "AccessDenied! (Considering verification email)" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
}

export const RegisterAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  try {
    const validateFileds = RegisterSchema.safeParse(values)
    if (!validateFileds.success) return { error: "Invalid field!" }
    const { email, password, userName } = validateFileds.data
    const salt = bcryptjs.genSaltSync(10)
    const hashPassword = bcryptjs.hashSync(password, salt)

    const existingUser = await getUserByEmail(email) 
    if (existingUser) return { error: "Email already existing" }
    await user.create({
      email,
      name: userName,
      password: hashPassword,
    })
    const verificationToken = await generationVerificationToken(email)

    if (!verificationToken)
      return { error: "Can't generate verification token" }

    const sendSuccessfull = await verificationTokenSendEmail(email, verificationToken.token)
    if (!sendSuccessfull) return { error: "Can't send token to your mail" }

    return { success: "Token was sent for verification" }
  } catch (error) {
    console.log(error)
    return { error: "Something went wrong!" }
  }
}

export const ResetPasswordAction = async (values: z.infer<typeof resetPasswordSchema>) => {
  try {
    const validateFileds = resetPasswordSchema.safeParse(values)
    if (!validateFileds.success) return { error: "Invalid field!" }
    const { email, code , password} = validateFileds.data
    const existingUser = await getUserByEmail(email)
    if(!existingUser) return {error: "Can't find your email"}

    const existingResetToken = await getResetPasswordTokenbyEmail(email)
    if(code){
      if(existingResetToken.token !== code) return {error: "Invalid Code", isTokenField: true}
    }

    if(!code){
       const newResetToken =  await generationResetPasswordToken(email)
       await resetPasswordTokenSendEmail(email, newResetToken.token)
       return {isTokenField: true, isPasswordField: false}
    }

    if(!password){
      return {isTokenField: false ,  isPasswordField: true}
    }
    
    const salt = bcryptjs.genSaltSync(10)
    const hashPassword = bcryptjs.hashSync(password, salt)
  
    await resetPasswordToken.findByIdAndDelete(existingResetToken._id)
    await user.findOneAndUpdate({email: existingResetToken.email}, {password: hashPassword})
  
    return { success: "Successfully" }
  } catch (error) {
    return { error: "Some thing went wrong" }
   
  }
}
