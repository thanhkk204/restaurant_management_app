import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(number: number): string {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

