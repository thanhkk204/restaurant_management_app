
import { z } from "zod"

export const LogInSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
export const RegisterSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string()
})
export const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
  code: z.string().optional()
})