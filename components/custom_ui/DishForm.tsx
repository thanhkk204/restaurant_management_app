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
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import ImageUpload from "@/components/custom_ui/ImageUpload"
import { useRouter } from "next/navigation"
import ClipLoader from "react-spinners/ClipLoader"
import { DishType } from "@/app/(admin)/dashboard/inventories/page"
import MultiSelect from "./MultiSelect"
import collection from "@/lib/models/collection"
import { CollectionType } from "@/app/(admin)/dashboard/inventories/collections/page"
import OneSelect from "./OneSelect"
import { CategoryType } from "@/app/(admin)/dashboard/inventories/categories/page"
import { FadeLoader } from "react-spinners"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(50),
  image: z.array(z.string()),
  price: z.number().gte(5),
  collection_ids: z.array(z.string()),
  category_id: z.string(),
})
type Props = {
  dish?: DishType
}
// Form reusable for update and add dish
export default function DishForm({ dish }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [collections, setCollections] = useState<CollectionType[] | null>(null)
  const [categories, setCategories] = useState<CategoryType[] | null>(null)
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
      title: dish ? dish.title : "",
      desc: dish ? dish.desc : "",
      image: dish ? dish.image : [],
      price: dish ? dish.price : 0,
      category_id: dish ? dish.category_id : "",
      collection_ids: dish ? dish.collection_ids : [],
    },
  })
  // Fetch categories and collections for dish form and table
  useEffect(() => {
    const fetCollecttions = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/inventories/collections", {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data!",
          })
        }
        const data: CollectionType[] = await res.json()
        setCollections(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all collection!",
        })
      }
    }
    fetCollecttions()
    const fetCategories = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/inventories/categories", {
          method: "GET",
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data!",
          })
        }
        const data: CategoryType[] = await res.json()
        setCategories(data)
        setLoading(false)
      } catch (error) {
        console.log(error)

        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with get all category!",
        })
      }
    }
    fetCategories()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = dish
      ? "/api/inventories/dishes/" + dish._id
      : "/api/inventories/dishes"
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: dish ? "PATCH" : "POST",
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: dish ? "Can't update dish" : "Can't add new dish",
        })
      }
      const data = await res.json()

      toast({
        variant: "sucess",
        title: dish ? data.message : "You added new dish succesfully",
      })
      dish ? router.push("/dashboard/inventories") : form.reset()
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something wrong with add new dish!",
      })
    }
  }
  function handleResetForm(e: any) {
    e.preventDefault()
    form.reset()
  }
  return (
    <div>
      {loading ? (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <FadeLoader
            color={sideBarColor ? sideBarColor : "#11cdef"}
            loading={loading}
          />
        </div>
      ) : (
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
                      <Input placeholder="Dish's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                      <Input
                        type="number"
                        placeholder="Dish's name"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <div className="w-full flex flex-col md:flex-row justify-between gap-5">
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Category</FormLabel>
                      <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                        <OneSelect
                          onChange={(selectedItem) =>
                            field.onChange(selectedItem)
                          }
                          placehoder="Select category"
                          value={field.value}
                          categories={categories}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="collection_ids"
                render={({ field }) => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>Collections</FormLabel>
                      <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                        <MultiSelect
                          onChange={(selectedItem) =>
                            field.onChange([...field.value, selectedItem])
                          }
                          onRemove={(removedItem) =>
                            field.onChange(
                              field.value.filter((item) => item !== removedItem)
                            )
                          }
                          placehoder="Select collection"
                          values={field.value}
                          collections={collections}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
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
                      values={field.value}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter((item) => item !== url),
                        ])
                      }
                    />
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
                ) : dish ? (
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
      )}
    </div>
  )
}
