"use client"
import { LogInSchema } from "@/lib/authSchemaZod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "@/auth"
import { LoginAction } from "@/actions/credentials"
import { BadgeCheck, ShieldAlert } from "lucide-react"
export default function LoginForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPeding, startTransition] = useTransition()
  // 1. Define your form.
  const form = useForm<z.infer<typeof LogInSchema>>({
    resolver: zodResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LogInSchema>) {
    startTransition(() =>
      LoginAction(values)
        .then((data) => {
          setSuccess(data.success), setError(data.error)
        })
        .catch((data) => setError(data.error))
    )
  }
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault(), onSubmit(form.getValues())
        }}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
          <div className="flex items-center gap-2 px-3 py-4 bg-red-400 rounded-sm text-white">
            <ShieldAlert /> <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 px-3 py-4 bg-green-400 rounded-sm text-white">
            <BadgeCheck /> <p>{success}</p>
          </div>
        )}
        <Button
          disabled={isPeding}
          type="submit"
          className="w-full px-4 py-6 bg-light-bg dark:bg-dark-bg text-lg text-light-text dark:text-dark-text
           shadow-md hover:shadow-cyan-500/50 transition-all ease-linear"
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
