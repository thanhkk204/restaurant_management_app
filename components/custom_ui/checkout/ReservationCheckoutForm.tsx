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
import { redirect, useRouter } from "next/navigation"
import ClipLoader from "react-spinners/ClipLoader"

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
import Image from "next/image"
import { useCart } from "@/lib/context/CartProvider"
import ReactDatePicker from "@/components/ReactDatePicker"
import { Skeleton } from "@/components/ui/skeleton"
import { AvailableTableType, DistricType, ProvinceType, ReservationType, WardType } from "@/types/type"
import { useSession } from "next-auth/react"

const formSchema =  z.object({
    orderType: z.string(),
    userName: z.string().min(2).max(50),
    detailAddress: z.string().min(2).max(50),
    province: z.string().nonempty("Please select a province"),
    district: z.string().nonempty("Please select a district"),
    ward: z.string().nonempty("Please select a ward"),
    party_size: z
      .number()
      .min(1),
    user_id: z.string(),
    table_id: z.string().optional(),
    payment_method: z.enum(["CASHPAYMENT", "BANKPAYMENT"]),
    digital_wallet_payment: z.enum(["MOMO", "VNPAY"]).optional(),
    startTime: z.date().optional(),
    endTime: z.date().optional(),

  }).superRefine((data, ctx) => {
    const { table_id, payment_method, startTime , endTime} = data;
    if (table_id && payment_method !== "BANKPAYMENT") {
      ctx.addIssue({
        code: "custom",
        path: ["payment_method"],
        message: "Đặt cọc 2 lít bẳng chuyển khoản trước khi đặt bàn"
      });
    } 
    //  handle if user is not provide startTime
    if(startTime === undefined){
      ctx.addIssue({
        code: "custom",
        path: ["startTime"],
        message: "Start time is required"
      });
    }
    //  handle if user is not provide endTime
    if(endTime === undefined){
      ctx.addIssue({
        code: "custom",
        path: ["endTime"],
        message: "End time is required"
      });
    }
    // handle if time between startTime and andTime smaller than 1 hour or larger than 3 hours
    if(startTime && endTime){
      const startT = new Date(startTime).getTime()
      const endT = new Date(endTime).getTime()
      const duration = (endT - startT) / 1000 / 60 / 60
      if(startT < new Date().getTime()) {
        ctx.addIssue({
          code: "custom",
          path: ["startTime"],
          message: "Start time must larger than now"
        });
      }
      if(endT < startT){
        ctx.addIssue({
          code: "custom",
          path: ["endTime"],
          message: "End time must larger than Start time"
        });
      }
      // if(duration < 0.9){
      //   ctx.addIssue({
      //     code: "custom",
      //     path: ["endTime"],
      //     message: "Duration must larger than 1"
      //   });
      // }
      // if(duration > 3){
      //   ctx.addIssue({
      //     code: "custom",
      //     path: ["endTime"],
      //     message: "Duration must smaller than 3"
      //   });
      // }

    }

  });

type Props = {
  reservation?: ReservationType
}
// Form reusable for update and add reservation
export default function ReservationCheckoutForm({
  reservation,
}: Props) {
  const [deposit, setDeposit] = useState<number>(200000)
  const [loading, setLoading] = useState<boolean>(false)
  const [provinces, setProvinces] = useState<ProvinceType[]>([])
  const [districts, setDistricts] = useState<DistricType[]>([])
  const [wards, setWards] = useState<WardType[]>([])
  const [tables, setTables] = useState<AvailableTableType[]>([])
  const [reservations, setReservations] = useState<ReservationType[]>([])
  const [createdReservation, setCreatedReservation] = useState<ReservationType | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  // Get values were passed in context
  const session = useSession()
  const value = useThemeContext()
  const { sideBarColor } = value
  // get cart in localstorage
  const {cart} = useCart()
  // 1. Define your form.
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderType: "reservation",
      userName: reservation ? reservation?.userName : "",
      detailAddress: reservation ? reservation.addres_id.detailAddress : "",
      district: reservation ? reservation.addres_id.district : "",
      province: reservation ? reservation.addres_id.province : "",
      ward: reservation ? reservation.addres_id.ward : "",
      party_size: reservation ? reservation.party_size : 0,
      payment_method: reservation ? reservation.payment_method : "CASHPAYMENT",
      digital_wallet_payment: "MOMO",
      user_id: "1",
      table_id: ""
    },
  })
  // re-render when form property change
  const selectedProvince = form.watch("province")
  const selectedDistrict = form.watch("district")
  const table_id = form.watch('table_id')
  const paymet_mehtod = form.watch('payment_method')
  const startTime = form.watch('startTime')
  const endTime = form.watch('endTime')
 

  const isTimeOverLap = (reservations: ReservationType[])=> {
    if(!startTime || !endTime) return

    return reservations.some(reservation=>{
       return (
        new Date(startTime) < new Date(reservation.startTime) &&
        new Date(endTime) > new Date(reservation.endTime)
      )
    })
  }
 
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
   // Get reservation for calculate time picker
   useEffect(()=>{
    if(!table_id) return
    const fetData = async () => {
      try {
        const res = await fetch("/api/checkout/reservation/"+table_id, {
            method: "GET",
          })
          if(!res){
            return toast({
              variant:'destructive',
              title: "Can't get any reservation for this table"
          })
          }
          const reservations = (await res.json()).reservations as ReservationType[]
          setReservations(reservations)
      } catch (error) {
        toast({
            variant:'destructive',
            title: "Some thing went wrong with get reservatio for time picker"
        })
      }
      }
      fetData()
      // reset value of startTime, if not user can choose the same time with existed reservation
      form.setValue('startTime', undefined)
      form.setValue('endTime', undefined)
}, [table_id])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(!session.data?.user) return toast({variant: "destructive", title: "Please log in before make reservation"})
      
    if(isTimeOverLap(reservations)) return toast({variant: "destructive", title: "You can't put reservation time overlap"})
    const reserUrl = "/api/checkout"
    const momoUrl = "api/onlinePayment/momo"
    setLoading(true)
    const {digital_wallet_payment, ...rest} = values
    try {
      const res = await fetch(reserUrl, {
        method: "POST",
        body: JSON.stringify({...rest, orderedDishes:[...cart], user_id: session.data.user.id}),
      })
      if (!res.ok) {
        return toast({
          variant: "destructive",
          title: "Can't order new reservation",
        })
      }
      const data = await res.json()
      const reservation = data.reservation as ReservationType
      toast({
        variant: "sucess", 
        title: data.message,
      })
      // if customer reserve table this will fire for privious payment
      if(digital_wallet_payment && table_id){
        const momoRes = await fetch(momoUrl, {
          method: "POST",
          body: JSON.stringify({
            deposit: deposit,
            checkout_id: reservation._id,
            clientName: values.userName
          })
        })
        const momoData = await momoRes.json()
        const payUrl = momoData.data.payUrl
        window.location.href = payUrl
      }
      setLoading(false)
      form.reset()
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something wrong with  checkout form!",
      })
    }
  }
  function handleResetForm(e: any) {
    e.preventDefault()
    form.reset()
  }
  return (
    <div className="h-fit">
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
              <FormItem className="flex-1">
                <FormLabel>Table (Đặt bàn trước cọc 2 lít) (Optional !!)</FormLabel>
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
      <div className="flex gap-5 md:gap-10 items-center">
          <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => {
            return (
              <FormItem className="flex-1 flex flex-col gap-1 md:gap-2">
                <FormLabel>Start Time &gt;&lt; Tùy chọn</FormLabel>
                <FormControl >
                   <ReactDatePicker
                    value={field.value}
                    onChange={(date)=>field.onChange(date)}
                    reservations={reservations}
                    table_id={table_id}
                   />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
          <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => {
            return (
              <FormItem className="flex-1 flex flex-col gap-1 md:gap-2">
                <FormLabel>End Time &gt;&lt; Tùy chọn</FormLabel>
                <FormControl >
                   <ReactDatePicker
                    value={field.value}
                    onChange={(date)=>field.onChange(date)}
                    reservations={reservations}
                    table_id={table_id}
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
                            <Label htmlFor="MOMO" className={cn(
                              "cursor-pointer",
                              field.value === "MOMO" ? 'shadow-lg shadow-cyan-500' : ''
                            )}>
                              <Image 
                              src="/images/momo_logo.png" 
                              alt="momo logo"
                              width={50}
                              height={50} 
                              />
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <RadioGroupItem value="VNPAY" id="VNPAY" hidden={true}/>
                            <Label htmlFor="VNPAY" className={cn(
                              "cursor-pointer",
                              field.value === "VNPAY" ? 'shadow-lg shadow-cyan-500' : ''
                            )}>
                               <Image 
                              src="/images/vnpay_logo.png" 
                              alt="momo logo"
                              width={50}
                              height={50} 
                              />
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
    </div>
  )
}
