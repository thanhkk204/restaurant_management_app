
import { AppWindow, CalendarDays, ContactRound, LaptopMinimal, PackageOpen, ReceiptText, Salad, Settings, Soup, UserRound } from "lucide-react";
export const colorsVariables = {
    purple: '#5e72e4',
    orange: '#fb6340',
    blue: '#11cdef',
    green: '#2dce89',
    red: '#f5365c',
    gray: '#344767',
}
export const sideBarVariables = [
    {
        icon: <LaptopMinimal className="min-w-5"/>,
        title: 'Thống kê',
        color: colorsVariables.purple,
        link:'/dashboard'
    },
    {
        icon: <ReceiptText className="min-w-5"/>,
        title: 'Hóa đơn',
        color: colorsVariables.orange,
        link:'/dashboard/invoices'
    },
    {
        icon: <CalendarDays className="min-w-5"/>,
        title: "Đặt bàn",
        accordino: true,
        color: colorsVariables.blue,
        link:'/dashboard/reservations'
    },
    {
        icon: <PackageOpen className="min-w-5"/>,
        title: "Mặt hàng",
        color: colorsVariables.purple,
        link:'/dashboard/inventories'
    },
    {
        icon: <Soup className="min-w-5"/>,
        title: 'Thực đơn',
        color: colorsVariables.green,
        link:'/dashboard/menu'
    },
    {
        icon: <ContactRound className="min-w-5"/>,
        title: 'Nhân viên',
        color: colorsVariables.red,
        link:'/dashboard/employees'
    },
    {
        icon: <UserRound className="min-w-5"/>,
        title: 'Khách hàng',
        color: colorsVariables.gray,
        link:'/dashboard/customers'
    },
]

