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
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import ImageUpload from "@/components/custom_ui/ImageUpload"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(50),
  image: z.string().url({ message: "Invalid url" })
})

export default function Add_new_collection() {
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  // Get values were passed in context
  const value = useDashBoardContext()
  if (!value) return
  const { sideBarColor } = value
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      image: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
   
    setLoading(true)
    try {
      const res = await fetch('/api/inventories/collections',{
        method: 'POST',
        body: JSON.stringify(values)
      })
      const data = await res.json()
      toast({
        title: "You added new collection succesfully",
      })
      form.reset()
      setLoading(false)
    } catch (error) {
      console.log(error);
      
      setLoading(false)
      toast({
         variant: "destructive",
        title: "Something wrong with add new collection!",
      })
    }
  }
  function handleResetForm(e: any) {
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
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                      <Input placeholder="Category's name" {...field} />
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
                    <Textarea {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                    <ImageUpload 
                    value={field.value ? [field.value] : []}
                    onChange={(value)=> field.onChange(value)}
                    />
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
