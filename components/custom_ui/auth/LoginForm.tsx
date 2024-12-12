"use client"
import { LogInSchema } from "@/lib/authSchemaZod"
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
import { LoginAction } from "@/actions/credentials"
import { BadgeCheck, ShieldAlert } from "lucide-react"
import { signIn } from "next-auth/react"; // Đúng cho phía client
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import SuspenseWrapper from "@/components/suspense/SuspenseWrapper"
export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const param = searchParams.get('error')

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPeding, startTransition] = useTransition()

  useEffect(()=>{
    if(param) setError(param)
  },[param])
  // 1. Define your form.
  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "huythanhle2805@gmail.com",
      password: "123456",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LogInSchema>) {
    setError(undefined)
    setSuccess(undefined)
    startTransition(() =>
      LoginAction(values)
        .then((data) => {
          console.log({data})
          setSuccess(data.success), setError(data.error)
          if(data.success) router.push('/')
        })
        .catch((data) => setError(data.error))
    )

    /**
     * For directly navigate, cause isn't work in server action
     */
    // const {email, password} = values
    // await signIn("credentials", {
    //   email,
    //   password,
    //   // redirectTo: DEFAULT_LOGIN_REDIRECT
    //   redirect: true,
    //   callbackUrl: '/'
    // })
  }
  
  
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault(), onSubmit(form.getValues())
        }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel className="text-[17px] text-light-textSoft dark:text-dark-textSoft">
                Email
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
        />

        <FormField
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
                  placeholder="Your password"
                />
              </FormControl>
            </FormItem>
          )}
        />
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
          {isPeding ? '...' : 'Login'}
        </Button>
        <div className="w-full text-start leading-7 py-4 text-light-textSoft dark:text-dark-textSoft">
          Forgot? <Button className="px-0" variant={"link"}><Link href={'/forgotPassword'} className="text-light-textSoft dark:text-dark-textSoft mt-0">Password</Link></Button>
        </div>
      </form>
    </Form>
  )
}
