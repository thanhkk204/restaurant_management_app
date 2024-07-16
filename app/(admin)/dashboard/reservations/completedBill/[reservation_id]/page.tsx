"use client"
import { useGetData } from "@/hooks/useGetdata"
import { ArrowLeft, Home, Mail, MapPin, Printer } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { DishType } from "../../../inventories/page"
import { OrderedFoodType, ReservationType } from "@/lib/constants/type"
import { toast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDateAndTime } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useThemeContext } from "@/lib/context/ThemeContextProvider"
import { FadeLoader } from "react-spinners"
import { Button } from "@/components/ui/button"

const CompletedBill = ({ params }: { params: { reservation_id: string } }) => {
  const router = useRouter()
  const { reservation_id } = params
  const [reservationDetail, setReservationDetail] = useState<ReservationType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [orderedFoods, setOrderedFoods] = useState<OrderedFoodType[]>([])

  const totalPrice = orderedFoods.reduce((sum, item) => {
    return sum + item.quantity * item.dish_id.price
  }, 0)
  // Get values were passed in context
  const value = useThemeContext()
  const { sideBarColor } = value

  // Get detail reservation
  useEffect(() => {
    try {
      const fetData = async () => {
        setLoading(true)
        const res = await fetch("/api/reservations/" + reservation_id, {
          method: "GET",
        })
        const data = await res.json()
        const reservation = data.reservationDetail as ReservationType

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't get any data for ordered dishes!",
          })
        }
        setReservationDetail(reservation)
        setLoading(false)
      }
      fetData()
    } catch (error) {
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something went wrong with get detail reservation",
      })
    }
  }, [reservation_id])
  // Get ordered food for reservation
  useEffect(() => {
    try {
      const fetData = async () => {
        setLoading(true)
        const res = await fetch(
          "/api/reservations/orderedFood/getAllFoodByReservationId/" +
            reservation_id,
          {
            method: "GET",
          }
        )
        const data = (await res.json()) as OrderedFoodType[]

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't get any data for ordered dishes!",
          })
        }
        setOrderedFoods(data)
        setLoading(false)
      }
      fetData()
    } catch (error) {
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Something went wrong with get ordered dishes!",
      })
    }
  }, [reservation_id])

  // Print and download bill
  const contentToPrint = useRef(null)
  const handlePrint = useReactToPrint({
    documentTitle: "One Bill",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  })

  return (
    <section className="w-full h-full bg-light-bg_2 dark:bg-dark-bg_2 rounded-md px-3 py-4">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <FadeLoader
            color={sideBarColor ? sideBarColor : "#11cdef"}
            loading={loading}
          />
        </div>
      )}
      {reservationDetail && orderedFoods && !loading && (
        <div className="relative w-full h-full">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="relative md:absolute top-0 left-0 md:py-4 md:px-3">
              <Button
                onClick={() => router.push("/dashboard/reservations")}
                className="flex items-center gap-2 cursor-pointer hover:scale-95 transition-transform ease-in"
              >
                <p>
                  <ArrowLeft width={20} height={20} />
                </p>
                <h3 className="font-medium text-[19px] font-serif">Back</h3>
              </Button>
            </div>
            <div className="relative md:absolute top-0 right-0 md:py-4 md:px-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handlePrint(null, () => contentToPrint.current)
                }}
                className="flex items-center gap-2 cursor-pointer hover:scale-95 transition-transform ease-in"
              >
                <p>
                  <Printer width={20} height={20} />
                </p>
                <h3 className="font-medium text-[19px] font-serif">Print</h3>
              </button>
            </div>
          </div>
          <div
            ref={contentToPrint}
            className="mx-auto max-w-[794px] bg-light-bg dark:bg-dark-bg rounded-md px-3 pb-4"
          >
            {/* Header bill */}
            <div className="w-full flex justify-center">
              <div className="max-w-[200px] max-h-[160px] overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  alt="Logo"
                  src={"/images/logo2.png"}
                  className="object-cover"
                />
              </div>
              <div className="py-3">
                <div className="w-full flex flex-col items-center justify-center px-5">
                  <h2 className="dark:text-dark-text text-[36px] font-medium font-serif">
                    Visit Us
                  </h2>
                  <div className="flex items-start py-2">
                    <MapPin className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                    <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                      Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội
                    </p>
                  </div>

                  <div className="flex items-start py-2">
                    <Home className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                    <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                      Open 9:30 am - 11h30 pm
                    </p>
                  </div>

                  <div className="flex items-start py-2">
                    <Mail className="text-light-text dark:text-dark-text min-w-[18px] shrink-0 px-1" />
                    <p className="text-light-textSoft dark:text-dark-textSoft text-[16px] text-center">
                      thanhKT285@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Body */}
            <div className="border-double border-b-4 border-sky-500 my-4"></div>
            <div className="flex justify-between">
              <div className="flex gap-8 max-w-[390px]">
                <h1 className="min-w-fit text-[20px]">Bill to</h1>
                <div className="flex flex-col">
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin pb-2">
                    Tên:
                    <span className="text-light-text dark:text-dark-text font-medium px-3">
                      {reservationDetail.userName
                        ? reservationDetail.userName
                        : reservationDetail.user_id.userName}
                    </span>
                  </p>
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin pb-2">
                    Địa chỉ:
                    <span className="text-light-text dark:text-dark-text font-medium px-3">
                      {reservationDetail.addres_id.detailAddress}, xã{" "}
                      {reservationDetail.addres_id.ward}, huyện{" "}
                      {reservationDetail.addres_id.district}, tỉnh{" "}
                      {reservationDetail.addres_id.province}
                    </span>
                  </p>
                  {reservationDetail.user_id?.email && (
                    <p className="text-light-textSoft dark:text-dark-textSoft font-thin pb-2">
                      Email:
                      <span className="text-light-text dark:text-dark-text font-medium px-3">
                        {reservationDetail.user_id?.email}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col min-w-[200px]">
                <div className="w-full flex items-center justify-between pb-2">
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    Ngày:
                  </p>
                  <p>{formatDateAndTime(reservationDetail.startTime).day}</p>
                </div>
                <div className="w-full flex items-center justify-between pb-2">
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    Giờ:
                  </p>
                  <p>{formatDateAndTime(reservationDetail.startTime).time}</p>
                </div>
                <div className="w-full flex items-center justify-between pb-2">
                  <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                    Bàn:
                  </p>
                  <p>{reservationDetail.table_id?.name}</p>
                </div>
              </div>
            </div>
            <div className="border-dashed border-b-2 border-sky-500 my-4"></div>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Tên</TableHead>
                  <TableHead className="min-w-[100px]">Ảnh</TableHead>
                  <TableHead className="max-w-[100px] text-center">
                    Số lượng
                  </TableHead>
                  <TableHead className="text-right min-w-[135px]">
                    Thành tiền
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderedFoods &&
                  orderedFoods.map((orderedFood) => (
                    <TableRow key={orderedFood._id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col leading-7 truncate">
                          <h2>{orderedFood.dish_id.title}</h2>
                          <p className="text-light-textSoft dark:text-dark-textSoft font-thin">
                            {formatCurrency(orderedFood.dish_id.price)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Image
                          width={50}
                          height={50}
                          alt="dishImage"
                          src={orderedFood.dish_id.image[0]}
                        />
                      </TableCell>
                      <TableCell>
                        <p className="text-center">{orderedFood.quantity}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(
                          orderedFood.quantity * orderedFood.dish_id.price
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-light-bg dark:bg-dark-bg">
                  <TableCell colSpan={2} className="text-[20px] font-medium">
                    Tổng
                  </TableCell>
                  <TableCell colSpan={2} className="text-right">
                    {formatCurrency(totalPrice)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      )}
    </section>
  )
}
export default CompletedBill
