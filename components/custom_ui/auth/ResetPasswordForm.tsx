"use client"
import { LogInSchema, resetPasswordSchema } from "@/lib/authSchemaZod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginAction, ResetPasswordAction } from "@/actions/credentials"
import { BadgeCheck, ShieldAlert } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
export default function ResetPasswordForm() {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isTokenField, setIsTokenField] = useState<boolean | undefined>(false)
  const [isPasswordField, setIsPasswordField] = useState<boolean | undefined>(false)
  const [isPeding, startTransition] = useTransition()


  // 1. Define your form.
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      code: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setError(undefined)
    setSuccess(undefined)
    startTransition(() =>
      ResetPasswordAction(values)
        .then((data) => {
          setSuccess(data.success),
          setError(data.error),
          setIsTokenField(data.isTokenField)
          setIsPasswordField(data.isPasswordField)
          if(data.success) form.reset()
        })
        .catch((data) => setError(data.error))
    )
  }
  useEffect(()=>{
     if(isTokenField && !error) toast({variant: "sucess", title: "Code's been sent to your email"})
     if(isPasswordField) toast({variant: "infor", title: "Enter new password"})
  },[isTokenField, isPasswordField])
  console.log({
    isTokenField,
    isPasswordField
  })
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault(), onSubmit(form.getValues())
        }}
      >
        {
          !isPasswordField && (<FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel className="text-[17px] text-light-textSoft dark:text-dark-textSoft">
                  Enter your email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm focus-visible:shadow-cyan-500
                   text-light-text dark:text-dark-text bg-transparent bg-light-bg_2 dark:bg-dark-bg_2 border-x-0 border-t-0 border-b"
                    placeholder="Your email"
                  />
                </FormControl>
              </FormItem>
            )}
          />)
        }

        {
          isTokenField && (<FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel className="text-[17px] text-light-textSoft dark:text-dark-textSoft">
                  Code
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm focus-visible:shadow-cyan-500
                   text-light-text dark:text-dark-text bg-transparent bg-light-bg_2 dark:bg-dark-bg_2 border-x-0 border-t-0 border-b"
                    placeholder="******"
                  />
                </FormControl>
              </FormItem>
            )}
          />)
        }
         {
          isPasswordField && (<FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel className="text-[17px] text-light-textSoft dark:text-dark-textSoft">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm focus-visible:shadow-cyan-500
                   text-light-text dark:text-dark-text bg-transparent bg-light-bg_2 dark:bg-dark-bg_2 border-x-0 border-t-0 border-b"
                    placeholder="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />)
        }

        {error && (
          <div className="flex items-center gap-2 px-3 py-3 bg-red-400 rounded-sm text-white mt-6">
            <ShieldAlert /> <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 px-3 py-3 bg-green-400 rounded-sm text-white mt-6">
            <BadgeCheck /> <p>{success}</p>
          </div>
        )}
        <Button
          disabled={isPeding}
          type="submit"
          className="w-full px-4 py-6 mt-6 bg-light-bg dark:bg-dark-bg text-lg text-light-text dark:text-dark-text
           shadow-md hover:shadow-cyan-500/50 transition-all ease-linear"
        >
          {isPeding ? '...' : !isPasswordField ? 'Next' : 'Reset Password'}
        </Button>
      </form>
    </Form>
  )
}
