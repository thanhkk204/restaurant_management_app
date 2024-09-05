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
import { useRouter } from "next/navigation"
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
import { cn, formatCurrency } from "@/lib/utils"
import Image from "next/image"
import { useCart } from "@/lib/context/CartProvider"
import {DistrictShipmentType, ProvinceShipmentType, ServiceShipmentType, WardShipmentType, ShipmentType } from "@/types/type"
import { useSession } from "next-auth/react"
import { culculateFree, getdistricts, getProvinces, getServices, getWards } from "@/actions/shipment"

const formSchema =  z.object({
    orderType: z.string(),
    userName: z.string().min(2).max(50),
    phoneNumber: z.string().min(9).max(50),

    detailAddress: z.string().min(2).max(50),
    note: z.string().min(2),
    service_id: z.string(),
    // service_type_id: z.string(),
    isPaidOnline: z.boolean().optional(),

    payment_method: z.enum(["CASHPAYMENT", "BANKPAYMENT"]),

    province: z.string().nonempty("Please select a province"),
    district: z.string().nonempty("Please select a district"),
    ward: z.string().nonempty("Please select a ward"),

    digital_wallet_payment: z.enum(["MOMO", "VNPAY"]).optional(),
 

  }).superRefine((data, ctx) => {
    const {payment_method } = data;
    // if ( payment_method !== "BANKPAYMENT") {
    //   ctx.addIssue({
    //     code: "custom",
    //     path: ["payment_method"],
    //     message: "Đặt cọc 2 lít bẳng chuyển khoản trước khi đặt bàn"
    //   });
    // } 
  });

type Props = {
  shipment?: ShipmentType
}
// Form reusable for update and add shipment
export default function ShipmentCheckoutForm({
  shipment,
}: Props) {
  const [deposit, setDeposit] = useState<number>(200000)
  const [loading, setLoading] = useState<boolean>(false)
  const [provinces, setProvinces] = useState<ProvinceShipmentType[]>([])
  const [districts, setDistricts] = useState<DistrictShipmentType[]>([])
  const [wards, setWards] = useState<WardShipmentType[]>([])
  const [services, setServices] = useState<ServiceShipmentType[]>([])
  const [serviceFee, setServiceFee] = useState<number | null>(null)
  const [clientProvinceName, setClientProvinceName] = useState<string | undefined>(undefined)
  const [clientDistrictName, setClientDistrictName] = useState<string | undefined>(undefined)
  const [clientWardName, setClientWardName] = useState<string | undefined>(undefined)
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
      orderType: "shipment",
      userName: shipment ? shipment?.userName : "",
      phoneNumber: shipment ? shipment?.phoneNumber : "",
      note: shipment ? shipment?.note : "",
      detailAddress: shipment ? shipment.addres_id.detailAddress : "",
      district: shipment ? shipment.addres_id.district : "",
      province: shipment ? shipment.addres_id.province : "",
      ward: shipment ? shipment.addres_id.ward : "",
      payment_method: shipment ? shipment.payment_method : "CASHPAYMENT",
      digital_wallet_payment: "MOMO",
      service_id: '53320'
    },
  })
  // re-render when form property change
  const selectedProvince = form.watch("province")
  const selectedDistrict = form.watch("district")
  const selectedWard = form.watch('ward')
  const selectedService = form.watch('service_id')
  const paymet_mehtod = form.watch('payment_method')

  //  set field isPaidOnline 
  useEffect(()=>{
    if(paymet_mehtod){
      if(paymet_mehtod === "BANKPAYMENT"){
        form.setValue('isPaidOnline', true)
      }else{
        form.setValue('isPaidOnline', false)
      }
    }
  },[paymet_mehtod])
   // fetch service 
   useEffect(() => {
    if (selectedDistrict) {
      const fetData = async () => {
        const res = await getServices(selectedDistrict)
        if(res.error) return toast({variant:"destructive", title: "Can't get services"})
          setServices(res.services)
      }
      fetData()
    } else {
      setServices([])
    }
  }, [selectedWard, form.setValue])
  // culculate free
  useEffect(() => {
    if(selectedDistrict && selectedWard && selectedService){
      const fetData = async () => {
        const res = await culculateFree(selectedDistrict, selectedWard, selectedService)
        if(res.error){
          toast({variant:"destructive", title: res.error})
          return setServiceFee(null)
        } 
        
        setServiceFee(res.serviceFee.service_fee)
      }
      fetData()
    }
  }, [selectedDistrict, selectedWard, selectedService])
  // fetch provinces
  useEffect(() => {
    const fetData = async () => {
      const res = await getProvinces()
      if(res.error) return toast({variant:"destructive", title: "Can't get provinces"})
      setProvinces(res.provinces)
    }
    fetData()
  }, [])
  // Fetch district
  useEffect(() => {
    if (selectedProvince) {
      const fetData = async () => {
        const res = await getdistricts(selectedProvince)
        if(res.error) return toast({variant:"destructive", title: "Can't get districts"})
        setDistricts(res.districts)
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
        const res = await getWards(selectedDistrict)
        if(res.error) return toast({variant:"destructive", title: "Can't get wards"})
        setWards(res.wards)
      }
      fetData()
    } else {
      setWards([])
    }
  }, [selectedDistrict, form.setValue])

  useEffect(()=>{
  if(selectedProvince){
    const province = provinces.find(province=> String(province.ProvinceID) === selectedProvince)
    setClientProvinceName(province?.ProvinceName)
  }
  if(selectedDistrict){
    const district = districts.find(district=> String(district.DistrictID) === selectedDistrict)
    setClientDistrictName(district?.DistrictName)
  }
  if(selectedWard){
    const ward = wards.find(ward=> String(ward.WardCode) === selectedWard)
    setClientWardName(ward?.WardName)
  }
  },[selectedProvince, selectedDistrict, selectedWard])
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(!session.data?.user) return toast({variant: "destructive", title: "Please log in before make shipment"})
      console.log({values})
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
          title: "Can't add your order",
        })
      }
      const data = await res.json()
      console.log(data)
      const shipment = data.shipment as ShipmentType
      toast({
        variant: "sucess", 
        title: data.message,
      })
      // if customer reserve table this will fire for privious payment
      if(digital_wallet_payment === "MOMO" && paymet_mehtod === "BANKPAYMENT" ){
        const momoRes = await fetch(momoUrl, {
          method: "POST",
          body: JSON.stringify({
            deposit: deposit,
            checkout_id: shipment._id,
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
    } finally {
      setLoading(false)
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

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>SDT</FormLabel>
                <FormControl className="bg-light-bg dark:bg-dark-bg">
                  <Input placeholder="Customer's phone" {...field} />
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
                          <SelectItem key={index} value={String(item.ProvinceID)}>
                            {item.ProvinceName}
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
                          <SelectItem key={index} value={String(item.DistrictID)}>
                            {item.DistrictName}
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
                          <SelectItem key={index} value={String(item.WardCode)}>
                            {item.WardName}
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
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl className="bg-light-bg dark:bg-dark-bg">
                <Textarea placeholder="Customer's note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          {
            selectedWard && (<div className="flex flex-col  sm:flex-row gap-2 sm:gap-0 items-start sm:items-center justify-between">
              <FormField
                control={form.control}
                name="service_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình thức chuyển phát</FormLabel>
                    <FormControl className="bg-light-bg dark:bg-dark-bg">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <div className="flex flex-col gap-2 md:gap-5">
                          {
                            services.map((service, index)=>(
                            <div 
                             key={index}
                            className="flex items-center space-x-2 cursor-pointer">
                              <RadioGroupItem value={String(service.service_id)} id={String(service.service_id)} />
                              <Label htmlFor={String(service.service_id)} className={cn(
                                "cursor-pointer",
                                field.value === String(service.service_id) ? "text-red-1" : ''
                              )}>
                                {service.short_name}
                              </Label>
                            </div>
                            
                            ))
                          }
                        </div>
                      </RadioGroup>

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
              <div className="flex flex-col gap-1 items-start">
                <p>
                  <span className="text-[15px]">From:</span>
                  <span className="text-light-textSoft dark:text-dark-textSoft px-3 text-[17px]">Chuyên Ngoại, Duy Tiên, Hà Nam</span>
                </p>
                <p>
                  <span className="text-[15px]">To:</span>
                  <span className="text-light-textSoft dark:text-dark-textSoft px-3 text-[17px]">{clientWardName}, {clientDistrictName}, {clientProvinceName}</span>
                </p>
                <p>Free:<span className="text-light-textSoft dark:text-dark-textSoft px-3 text-[17px]">{formatCurrency(Number(serviceFee))}</span></p>
                </div>
            </div>)
        }
      
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
            paymet_mehtod === "BANKPAYMENT" && ( <FormField
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
            ) : shipment ? (
              "Cập nhật"
            ) : (
              "Đặt hàng"
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
