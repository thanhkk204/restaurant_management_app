"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  desc: z.string().min(2).max(50),
})

export default function Add_new_category() {
   // Get values were passed in context
   const value = useDashBoardContext()
   if (!value) return
   const { sideBarColor } = value
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       name: "",
       desc: "",
     },
   })
 
   function onSubmit(values: z.infer<typeof formSchema>) {
     // Do something with the form values.
     // ✅ This will be type-safe and validated.
     console.log(values)
   }
   function handleResetForm(e: any){
    e.preventDefault()
    form.reset()
   }
  return (
    <section className="min-h-screen md:min-h-fit px-3 md:px-5 py-4 md:py-6">
    <div className="w-full lg:max-w-[50%]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                    <Input
                      placeholder="Category's name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                  <Textarea {...field} placeholder="Description"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            style={
              sideBarColor
                ? { backgroundColor: sideBarColor, color: "white" }
                : { backgroundColor: "" }
            }
            className="mr-4 font-medium text-[16px]"
          >
            Thêm mới
          </Button>
          <Button
          onClick={handleResetForm}
            type="button"
            style={
              sideBarColor
                ? { backgroundColor: sideBarColor, color: "white" }
                : { backgroundColor: "" }
            }
            className="font-medium text-[16px]"
          >
            Làm mới
          </Button>
        </form>
      </Form>
    </div>
    </section>
  )
}
