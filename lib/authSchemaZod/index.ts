
import { z } from "zod"

export const LogInSchema = z.object({
  email: z.string().email(),
  password: z.string()
})