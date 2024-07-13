"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { useThemeContext } from "@/lib/context/ThemeContextProvider"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import ImageUpload from "@/components/custom_ui/ImageUpload"
import { useRouter } from "next/navigation"
import { CategoryType } from "@/app/(admin)/dashboard/inventories/categories/page"
import ClipLoader from "react-spinners/ClipLoader"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(50),
})
type Props = {
  category?: CategoryType
}
// Form reusable for update and add category
export default function CategoryForm({ category }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()
  // Get values were passed in context
  const value = useThemeContext()
  if (!value) return
  const { sideBarColor } = value
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: category ? category.title : "",
      desc: category ? category.desc : "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = category
      ? "/api/inventories/categories/" + category._id
      : "/api/inventories/categories"
    setLoading(true)

    try {
      const res = await fetch(url, {
        method: category ? "PATCH" : "POST",
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: category ? "Can't update category" : "Can't add new category",
        })
      }
      const data = await res.json()

      if (res.status === 500) {
        toast({
          variant: "destructive",
          title: data.message,
        })
        setLoading(false)
        return
      }

      if (res.status === 401) {
        toast({
          variant: "destructive",
          title: data.message,
        })
        setLoading(false)
        return
      }
      console.log(res.status)
      toast({
        variant: "sucess",
        title: category ? data.message : "You added new category succesfully",
      })
      category ? router.push("/dashboard/inventories/categories") : form.reset()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something wrong with add new category!",
      })
    }
  }
  function handleResetForm(e: any) {
    e.preventDefault()
    form.reset()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
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

        <div className="flex items-center">
          <Button
            type="submit"
            className="mr-4 font-medium text-[16px]"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader
                color={sideBarColor ? sideBarColor : "#11cdef"}
                loading={loading}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : category ? (
              "Cập Nhật"
            ) : (
              "Thêm mới"
            )}
          </Button>

          <Button
            onClick={handleResetForm}
            type="button"
            className="font-medium text-[16px]"
          >
            Làm mới
          </Button>
        </div>
      </form>
    </Form>
  )
}
