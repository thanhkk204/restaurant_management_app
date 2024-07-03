import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(number: number): string {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
export function formatDateAndTime(datetime: string): {day:string, time: string} {
   console.log(datetime)
  // Tạo một đối tượng Date từ chuỗi thời gian
  const dateObj = new Date(datetime);
  
  // Lấy các phần của ngày và giờ
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  
  // Định dạng ngày
  const formattedDay = `${day}/${month}/${year}`;
  
  // Định dạng giờ
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
  return {
    day: formattedDay,
    time: formattedTime
  }
}

