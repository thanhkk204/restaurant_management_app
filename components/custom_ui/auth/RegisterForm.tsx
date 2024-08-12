"use client"
import { RegisterSchema } from "@/lib/authSchemaZod"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterAction } from "@/actions/credentials"
export default function RegisterForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    RegisterAction(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[17px] text-light-textSoft dark:text-dark-textSoft">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm focus-visible:shadow-cyan-500
                 text-light-text dark:text-dark-text bg-transparent bg-light-bg_2 dark:bg-dark-bg_2 border-x-0 border-t-0 border-b"
                  placeholder="Your name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full px-4 py-6 bg-light-bg dark:bg-dark-bg text-lg text-light-text dark:text-dark-text
           shadow-md hover:shadow-cyan-500/50 transition-all ease-linear"
        >
          Register
        </Button>
      </form>
    </Form>
  )
}
