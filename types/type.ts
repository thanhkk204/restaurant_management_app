import { CategoryType } from "@/app/(admin)/dashboard/inventories/categories/page"
import { CollectionType } from "@/app/(admin)/dashboard/inventories/collections/page"
import { DishType } from "@/app/(admin)/dashboard/inventories/page"
import { LocationType, TableType } from "@/app/(admin)/dashboard/reservations/page"

enum PaymentMethod {
    CASHPAYMENT = "CASHPAYMENT",
    BANKPAYMENT = "BANKPAYMENT",
}
enum ReservationStatus {
    RESERVED = "RESERVED",
    SEATED = "SEATED",
    ISNOTPAID = "ISNOTPAID",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}
enum ShipmentStatus {
    RESERVED = "RESERVED",
    DELIVERING = "DELIVERING",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED",
}
export type AddressType = {
    _id: string,
    province: string,
    district: string,
    ward: string,
    detailAddress: string,
}
export type ShipmentType = {
    _id: string,
    order_code: string,
    user_id: UserType,
    userName: string,
    phoneNumber: string,
    note: string,
    addres_id: AddressType,
    dish_id: OrderedFoodType[],
    payment_method: PaymentMethod,
    status: ShipmentStatus,
    service_id: number,
    service_type_id: number,
    prepay: number,
    isPaidOnline: boolean
}
export type ReservationType = {
    _id: string,
    table_id: TableType,
    user_id: UserType,
    userName: string,
    phoneNumber: string,
    addres_id: AddressType,
    party_size: number,
    dish_id: OrderedFoodType[],
    payment_method: PaymentMethod,
    status: ReservationStatus,
    prepay: number,
    startTime: string,
    endTime: string
}
export type InvoiceType = {
    reservation_id: string,
    user_id: string,
    time_to_fisnish: string,
    discount_id: string,
    total_money: Number,
    paid_money: Number
}
export type UserType = {
    email: string,
    password: string,
    userName: string,
    image: string,
    address: AddressType,
    gender: string,
}
export type OrderedFoodType = {
    _id: string,
    dish_id: DishType,
    reservation_id?: string,
    shipment_id?: string,
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
export type ProvinceShipmentType = {
    ProvinceID: number,
    ProvinceName: string,
    CountryID: number,
    Code: string
}
export type DistrictShipmentType = {
    DistrictID: number,
    DistrictName: string,
    DeliverType: number,
    ProvinceID: number,
    Code: string
}
export type WardShipmentType = {
    WardCode: string
    WardName: string,
    DeliverType: number,
    DistrictID: number,
}
export type ServiceShipmentType = {
    service_id: number
    service_type_id: number
    short_name: string
    config_fee_id: string
    extra_cost_id: string
}
export type CartItem = {
    dish_id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

  enum TableEnum {
    AVAILABLE = "AVAILABLE",
    ISSERVING = "ISSERVING",
    ISBOOKED = "ISBOOKED",
  }
export type AvailableTableType = {
    _id: string
    location_id: LocationType
    name: string
    number_of_seats: number
    order: number
    status: TableEnum
}

export type FilteredProductType = {
    _id: string
    title: string
    image: string[]
    price: number
    desc: string
    isShow: boolean
    category_id: CategoryType
    collection_ids: CollectionType[]
}