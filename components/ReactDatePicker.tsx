"use client"
import { ReservationType } from "@/lib/constants/type";
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    value: Date | undefined,
    onChange: (date: Date | null)=> void
    reservations: ReservationType[]
}
function ReactDatePicker({value, onChange, reservations}:Props) {
  const [duration, setDuration] = useState<number>(1);
  const [intervalTime, setIntervalTime] = useState<number>(15)
  const [minTime, setMinTime] = useState<Date>(()=>{
    const today = new Date()
    return new Date(today.setHours(9,0))
  })
  const [maxTime, setMaxTime] = useState<Date>(()=>{
    const today = new Date()
    return new Date(today.setHours(22,0))
  })
  // const [reservations, setReservations] = useState([
  //   { startTime: '2024-07-15T09:00:00' },
  //   { startTime: '2024-07-16T11:00:00' },
  //   // Add more reservations as needed
  // ]);
  const [excludedTimes, setExcludedTimes] = useState<Date[]>([])


  const generateExcludedTimes = (reservations: ReservationType[]) => {
    const times: Date[] = [];
    reservations.forEach((reservation: any )=> {
      const reservationDate = new Date(reservation.startTime);
      const selectedDate = value ? value : new Date()
      if (
        reservationDate.getFullYear() === selectedDate.getFullYear() &&
        reservationDate.getMonth() === selectedDate.getMonth() &&
        reservationDate.getDate() === selectedDate.getDate()
      ) {
        // Loại trừ thời gian hiện tại
         const currentTime = new Date(reservationDate)
         times.push(currentTime)
        // Loại trừ 2 giờ trước startTime
        const timeOf2HoursLater = new Date(reservation.startTime).getTime() + duration * 60 * 60 * 1000

         let intervalTimeAfter2Hours = currentTime.getTime()

         while(intervalTimeAfter2Hours <= timeOf2HoursLater){
          times.push(new Date(intervalTimeAfter2Hours))
          intervalTimeAfter2Hours = intervalTimeAfter2Hours + intervalTime * 60 * 1000
         }

        // Loại trừ 2 giờ sau startTime
        const timeOf2HoursBefore = new Date(reservation.startTime).getTime() - duration * 60 * 60 * 1000
        let intervalTimeBefore2Hours = currentTime.getTime()

         while(intervalTimeBefore2Hours >= timeOf2HoursBefore){
          times.push(new Date(intervalTimeBefore2Hours))
          intervalTimeBefore2Hours = intervalTimeBefore2Hours - intervalTime * 60 * 1000
         }
      }
    });
    return times;
  };

  useEffect(()=>{
      setExcludedTimes(generateExcludedTimes(reservations))
  }, [value])
  
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
      timeIntervals={intervalTime}
      excludeTimes={excludedTimes}
    />
  )
}

export default ReactDatePicker
