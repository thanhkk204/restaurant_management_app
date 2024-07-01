import { DishType } from "@/app/(admin)/dashboard/inventories/page"

enum PaymentMethod {
    CASHPAYMENT = "CASHPAYMENT",
    BANKPAYMENT = "BANKPAYMENT",
}
enum ReservationStatus {
    RESERVED = "RESERVED",
    DELIVERY = "DELIVERY",
    SEATED = "SEATED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}
export type ReservationType = {
    _id: string,
    table_id: string,
    user_id: string,
    userName: string,
    addres_id: AddressType,
    party_size: number,
    dish_id: string[],
    payment_method: PaymentMethod,
    status: ReservationStatus,
    prepay: number,
    startTime: string,
    endTime: string
}
export type AddressType = {
    _id: string,
    province: string,
    district: string,
    ward: string,
    detailAddress: string,
}
export type OrderedFoodType = {
    _id: string,
    dish_id: DishType,
    reservation_id: string,
    quantity: number,
    isOrderedOnline: boolean
}
export type ProvinceType = {
    province_id: string,
    province_name: string,
    province_type: string
}
export type DistricType = {
    district_id: string,
    province_id: string,
    district_name: string,
    district_type: string
}
export type WardType = {
    district_id: string,
    ward_id: string,
    ward_name: string,
    ward_type: string
}

