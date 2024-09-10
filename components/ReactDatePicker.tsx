"use client"
import { ReservationType } from "@/types/type";
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    value: Date | undefined,
    onChange: (date: Date | null)=> void
    reservations: ReservationType[]
    table_id: string | undefined
}
function ReactDatePicker({value, onChange, reservations, table_id}:Props) {
  const [timeSpace, setTimeSpace] = useState<number>(5)
  const [minTime, setMinTime] = useState<Date>(()=>{
    const today = new Date()
    return new Date(today.setHours(9,0))
  })
  const [maxTime, setMaxTime] = useState<Date>(()=>{
    const today = new Date()
    return new Date(today.setHours(23,59))
  })
 
  const [excludedTimes, setExcludedTimes] = useState<Date[]>([])


  const generateExcludedTimes = (orders: ReservationType[]) => {
    const times: Date[] = [];
    orders.forEach((reservation: any )=> {
      const reservationStartTime = new Date(reservation.startTime);
      const reservationEndTime = new Date(reservation.endTime)

      const selectedDate = value ? value : new Date()
      if (
        reservationStartTime.getFullYear() === selectedDate.getFullYear() &&
        reservationStartTime.getMonth() === selectedDate.getMonth() &&
        reservationStartTime.getDate() === selectedDate.getDate()
      ) {
        // Loại trừ thời gian hiện tại
         const currentTime = new Date(reservationStartTime)
         times.push(currentTime)

         let timeDuration = currentTime.getTime()
        // thêm 1 khoảng thời gian vào sau endTime cho đến khi inngest thực thi không bị lỗi 
         while(timeDuration <= reservationEndTime.getTime() + timeSpace * 60 * 1000){
          times.push(new Date(timeDuration))
          timeDuration = timeDuration + timeSpace * 60 * 1000
         }
      }
    });
    return times;
  };

  useEffect(()=>{
      setExcludedTimes(generateExcludedTimes(reservations))
  }, [value, reservations])
  return (
    <DatePicker
     className="w-full bg-light-bg dark:bg-dark-bg focus:outline-none px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md"
      selected={value}
      onChange={(date) => onChange(date)}
      dateFormat={"dd/MM/yyyy, HH:mm"}
      minDate={new Date()}
      showTimeSelect
      timeFormat="HH:mm"
      minTime={minTime}
      maxTime={maxTime}
      timeIntervals={timeSpace}
      excludeTimes={table_id ? excludedTimes : []}
    />
  )
}

export default ReactDatePicker
