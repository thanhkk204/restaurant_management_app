"use client"
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    value: Date | undefined,
    onChange: (date: Date | null)=>void
}
function ReactDatePicker({value, onChange}:Props) {
  const [duration, setDuration] = useState<number>(2);
  const [reservations, setReservations] = useState([
    { startTime: '2024-07-15T09:00:00' },
    { startTime: '2024-07-16T11:00:00' },
    // Add more reservations as needed
  ]);
  const [excludedTimes, setExcludedTimes] = useState([])


  const generateExcludedTimes = (reservations: any) => {
    const times: any = [];
    const interval = 15 * 60 * 1000; // 15 minutes in milliseconds

    reservations.forEach((reservation: any )=> {
      const reservationDate = new Date(reservation.startTime);
      const selectedDate = value ? value : new Date()
      if (
        reservationDate.getFullYear() === selectedDate.getFullYear() &&
        reservationDate.getMonth() === selectedDate.getMonth() &&
        reservationDate.getDate() === selectedDate.getDate()
      ) {
        // Loại trừ thời gian hiện tại
          times.push(new Date(reservationDate.getTime()))
        // Loại trừ 2 giờ trước startTime
        for (let i = 1; i <= 8; i++) {
          times.push(new Date(reservationDate.getTime() - i * interval));
        }
        // Loại trừ 2 giờ sau startTime
        for (let i = 1; i <= 8; i++) {
          times.push(new Date(reservationDate.getTime() + i * interval));
        }
      }
    });
    return times;
  };
  useEffect(()=>{
      const excludedTimes = generateExcludedTimes(reservations)
      setExcludedTimes(excludedTimes)
  }, [value])
  
  return (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
      dateFormat={"dd/MM/yyyy, hh:mm"}
      minDate={new Date()}
      showTimeSelect
      timeIntervals={15}
      timeFormat="HH:mm"
      excludeTimes={excludedTimes}
    />
  )
}

export default ReactDatePicker
