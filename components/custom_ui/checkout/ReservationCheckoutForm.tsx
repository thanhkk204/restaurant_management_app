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
import {
    AvailableTableType,
  DistricType,
  ProvinceType,
  ReservationType,
  WardType,
} from "@/lib/constants/type"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { TableType } from "@/app/(admin)/dashboard/reservations/page"

const formSchema =  z.object({
    userName: z.string().min(2).max(50),
    detailAddress: z.string().min(2).max(50),
    province: z.string().nonempty("Please select a province"),
    district: z.string().nonempty("Please select a district"),
    ward: z.string().nonempty("Please select a ward"),
    party_size: z
      .number()
      .min(1),
    user_id: z.number(),
    table_id: z.string().optional(),
    payment_method: z.enum(["CASHPAYMENT", "BANKPAYMENT"]),
    digital_wallet_payment: z.enum(["MOMO", "VNPAY"]).optional()

  }).superRefine((data, ctx) => {
    const { table_id, payment_method } = data;
    if (table_id && payment_method !== "BANKPAYMENT") {
      ctx.addIssue({
        code: "custom",
        path: ["payment_method"],
        message: "Đặt cọc 2 lít bẳng chuyển khoản trước khi đặt bàn"
      });
    } 
  });

type Props = {
  reservation?: ReservationType
}
// Form reusable for update and add reservation
export default function ReservationCheckoutForm({
  reservation,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const [provinces, setProvinces] = useState<ProvinceType[]>([])
  const [districts, setDistricts] = useState<DistricType[]>([])
  const [wards, setWards] = useState<WardType[]>([])
  const [tables, setTables] = useState<AvailableTableType[]>([])
  const [createdReservation, setCreatedReservation] = useState<ReservationType | null>(null)
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
      userName: reservation ? reservation?.userName : "",
      detailAddress: reservation ? reservation.addres_id.detailAddress : "",
      district: reservation ? reservation.addres_id.district : "",
      province: reservation ? reservation.addres_id.province : "",
      ward: reservation ? reservation.addres_id.ward : "",
      party_size: reservation ? reservation.party_size : 0,
      payment_method: reservation ? reservation.payment_method : "CASHPAYMENT",
      user_id: 1,
      table_id: ""
    },
  })
  // re-render when form property change
  const selectedProvince = form.watch("province")
  const selectedDistrict = form.watch("district")
  const table_id = form.watch('table_id')
  const paymet_mehtod = form.watch('payment_method')

  // fetch provinces
  useEffect(() => {
    const fetData = async () => {
      const res = await fetch("/api/address/provinces", {
        method: "GET",
      })
      const provinces = (await res.json()) as ProvinceType[]

      setProvinces(provinces)
    }
    fetData()
  }, [])
  // Fetch district
  useEffect(() => {
    if (selectedProvince) {
      const fetData = async () => {
        const res = await fetch("/api/address/districts/" + selectedProvince, {
          method: "GET",
        })
        const districts = (await res.json()) as DistricType[]

        setDistricts(districts)
      }
      fetData()
    } else {
      setDistricts([])
    }
  }, [selectedProvince, form.setValue])
  // Fetch ward
  useEffect(() => {
    if (selectedDistrict) {
      const fetData = async () => {
        const res = await fetch("/api/address/wards/" + selectedDistrict, {
          method: "GET",
        })
        const wards = (await res.json()) as WardType[]

        setWards(wards)
      }
      fetData()
    } else {
      setWards([])
    }
  }, [selectedDistrict, form.setValue])
  // fetch available table
  useEffect(() => {

      const fetData = async () => {
      try {
        const res = await fetch("/api/checkout/reservation", {
            method: "GET",
          })
          const tables = (await res.json()).tables as AvailableTableType[]
          setTables(tables)
      } catch (error) {
        toast({
            variant:'destructive',
            title: "Can't get any available table"
        })
      }
      }
      fetData()
  }, [form.setValue])
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // const url = reservation
    //   ? "/api/reservations/" + reservation._id
    //   : "/api/reservations"
    // setLoading(true)
    // try {
    //   const res = await fetch(url, {
    //     method: reservation ? "PATCH" : "POST",
    //     body: JSON.stringify({ ...values, table_id }),
    //   })
    //   if (!res.ok) {
    //     return toast({
    //       variant: "destructive",
    //       title: reservation
    //         ? "Can't update reservation"
    //         : "Can't add new reservation",
    //     })
    //   }
    //   const data = await res.json()
    //   const reser = data.reservation as ReservationType
    //   setCreatedReservation(reser)
    //   toast({
    //     variant: "sucess",
    //     title: reservation
    //       ? data.message
    //       : "You added new reservation succesfully",
    //   })
    //   reservation && router.push("/dashboard/reservations")
    //   setLoading(false)
    // } catch (error) {
    //   console.log(error)
    //   setLoading(false)
    //   toast({
    //     variant: "destructive",
    //     title: "Something wrong with reservation form!",
    //   })
    // }
  }
  function handleResetForm(e: any) {
    e.preventDefault()
    form.reset()
  }
  function handleOrderedMenu() {
    const reservation_id = createdReservation
      ? createdReservation._id
      : reservation?._id
    router.push("/dashboard/reservations/orderedFood/" + reservation_id)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tên khách hàng</FormLabel>
                <FormControl className="bg-light-bg dark:bg-dark-bg">
                  <Input placeholder="Customer's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tỉnh/Thành phố</FormLabel>
                <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="flex-1 bg-transparent dark:bg-transparent">
                      <SelectValue placeholder="Tỉnh/Thành phố" />
                    </SelectTrigger>

                    <SelectContent className="bg-light-bg dark:bg-dark-bg">
                      <SelectGroup>
                        <SelectLabel className="font-extrabold">
                          Tỉnh/Thành phố
                        </SelectLabel>
                        {provinces.map((item, index) => (
                          <SelectItem key={index} value={item.province_id}>
                            {item.province_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Huyện</FormLabel>
                <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="flex-1 bg-transparent dark:bg-transparent">
                      <SelectValue placeholder="Huyện" />
                    </SelectTrigger>
                    <SelectContent className="bg-light-bg dark:bg-dark-bg">
                      <SelectGroup>
                        <SelectLabel className="font-extrabold">
                          Huyện
                        </SelectLabel>
                        {districts.map((item, index) => (
                          <SelectItem key={index} value={item.district_id}>
                            {item.district_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ward"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Xã</FormLabel>
                <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="bg-transparent dark:bg-transparent">
                      <SelectValue placeholder="Xã" />
                    </SelectTrigger>
                    <SelectContent className="bg-light-bg dark:bg-dark-bg">
                      <SelectGroup>
                        <SelectLabel className="font-extrabold">Xã</SelectLabel>
                        {wards.map((item, index) => (
                          <SelectItem key={index} value={item.ward_id}>
                            {item.ward_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="detailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ chi tiết</FormLabel>
              <FormControl className="bg-light-bg dark:bg-dark-bg">
                <Textarea placeholder="Customer's address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="party_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng khách</FormLabel>
              <FormControl className="bg-light-bg dark:bg-dark-bg">
                <Input
                  type="number"
                  placeholder="Party size"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="table_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Table (Đặt bàn trước cọc 2 lít)</FormLabel>
                <FormControl className="bg-light-bg_2 dark:bg-dark-bg_2">
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="bg-transparent dark:bg-transparent">
                      <SelectValue placeholder="Table"/>
                    </SelectTrigger>
                    <SelectContent className="bg-light-bg dark:bg-dark-bg">
                      <SelectGroup>
                        <SelectLabel className="font-extrabold">Tables</SelectLabel>
                        {tables.map((table, index) => (
                          <SelectItem key={index} value={table._id}>
                            {`${table.name} (${table.location_id.locationInRestaurant})`}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phương thức thanh toán</FormLabel>
              <FormControl className="bg-light-bg dark:bg-dark-bg">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value="CASHPAYMENT" id="CASHPAYMENT" />
                      <Label htmlFor="CASHPAYMENT" className="cursor-pointer">
                        Tiền mặt
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <RadioGroupItem value="BANKPAYMENT" id="BANKPAYMENT" />
                      <Label htmlFor="BANKPAYMENT" className="cursor-pointer">
                        Chyển khoản
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {
            table_id && paymet_mehtod === "BANKPAYMENT" && ( <FormField
                control={form.control}
                name="digital_wallet_payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl className="bg-light-bg dark:bg-dark-bg">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <RadioGroupItem value="MOMO" id="MOMO" hidden={true}/>
                            <Label htmlFor="MOMO" className="cursor-pointer">
                              Momo
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <RadioGroupItem value="VNPAY" id="VNPAY" hidden={true}/>
                            <Label htmlFor="VNPAY" className="cursor-pointer">
                              VN Pay
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />)
        }


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
            ) : reservation ? (
              "Cập nhật"
            ) : (
              "Đặt bàn"
            )}
          </Button>

          <Button
            onClick={handleResetForm}
            type="button"
            className="mr-4 font-medium text-[16px]"
          >
            Làm mới
          </Button>

        </div>
      </form>
    </Form>
  )
}