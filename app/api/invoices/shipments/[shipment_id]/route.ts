import dish from "@/lib/models/dish"
import orderedDish from "@/lib/models/orderedDish"
import shipment from "@/lib/models/shipment"
import { connectToDB } from "@/lib/mongoDB"
import { OrderedFoodType, ShipmentType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { shipment_id: string } }
) {
  const { shipment_id } = params
  if (!shipment_id)
    return NextResponse.json(
      { message: "There is no ID for create ordered" },
      { status: 491 }
    )

  await connectToDB()
  try {
    const shipmentInfor = (await shipment
      .findById(shipment_id)
      .populate("addres_id")) as ShipmentType
    await dish.find({})
    const orderedDishes = (await orderedDish
      .find({ shipment_id: shipment_id })
      .populate("dish_id")) as OrderedFoodType[]
    if (!shipment || !orderedDishes) {
      return NextResponse.json(
        { message: "Can't get information of shipment" },
        { status: 491 }
      )
    }
    const itemArr = orderedDishes.map((orderedDish) => ({
      name: orderedDish.dish_id.title,
      quantity: orderedDish.quantity,
      price: orderedDish.dish_id.price,
    }))
    const totalPrice = orderedDishes.reduce((total, item) => {
      return (total += item.dish_id.price * item.quantity)
    }, 0)
    const GHN_BODY = {
      payment_type_id: 2, // choosen person who pay for this ship // 1: shop/seller, 2: buyer
      note: shipmentInfor.note, // client field
      required_note: "KHONGCHOXEMHANG",
      // from_name: "Lê Huy Thanh", if there is no this field, automaticlly take shop's name
      from_phone: "0392238894",
      from_address: "Nhà số 5, Phương Canh, Nam Từ Liêm, Hà Nội",
      from_ward_name: "Phương Canh",
      from_district_name: "Nam Từ Liêm",
      from_province_name: "Hà Nội",
      return_phone: "0392238894",
      return_address: "Nhà số 5, Phương Canh, Nam Từ Liêm, Hà Nội",
      // "return_district_id": 2264,
      // client_order_code: "id_client",
      to_name: shipmentInfor.userName, // client field
      to_phone: shipmentInfor.phoneNumber, // client field
      to_address: shipmentInfor.addres_id.detailAddress, // client field
      to_ward_code: shipmentInfor.addres_id.ward, // client field
      to_district_id: Number(shipmentInfor.addres_id.district), // client field
      cod_amount: totalPrice,
      content: "Giao đồ ăn nhanh cho khách",
      weight: 200,
      // length: 1,
      // width: 19,
      // height: 10,
      pick_station_id: 1444,
      deliver_station_id: null,
      insurance_value: totalPrice,
      service_id: Number(shipmentInfor.service_id), // client field
      // service_type_id: 2, // client field
      // "coupon":null,
      // "pick_shift":[2, 3, 4],
      items: itemArr,
    }
    //   const GHN_BODY = {
    //     payment_type_id: 2, // choosen person who pay for this ship // 1: shop/seller, 2: buyer
    //     note: "Giao hàng vào giờ hành chính", // client field
    //     required_note: "KHONGCHOXEMHANG",
    //     from_name: "Lê Huy Thanh",
    //     from_phone: "0392238894",
    //     from_address: "Nhà số 5, Phương Canh, Nam Từ Liêm, Hà Nội",
    //     from_ward_name: "Phương Canh",
    //     from_district_name: "Nam Từ Liêm",
    //     from_province_name: "Hà Nội",
    //     return_phone: "0392238894",
    //     return_address: "Nhà số 5, Phương Canh, Nam Từ Liêm, Hà Nội",
    //     // "return_district_id": 2264,
    //     client_order_code: "id_client",
    //     to_name: "TinTest124", // client field
    //     to_phone: "0987654321", // client field
    //     to_address: "72 Thành Thái, Phường 14, Quận 10, Hồ Chí Minh, Vietnam", // client field
    //     to_ward_code: "20308", // client field
    //     to_district_id: 1444, // client field
    //     cod_amount: 1100000,
    //     content: "Giao đồ ăn nhanh cho khách",
    //     weight: 200,
    //     length: 1,
    //     width: 19,
    //     height: 10,
    //     pick_station_id: 1444,
    //     deliver_station_id: null,
    //     // "insurance_value": 50000,
    //     service_id: 53321, // client field
    //     service_type_id: 2, // client field
    //     // "coupon":null,
    //     // "pick_shift":[2, 3, 4],
    //     items: [
    //         {
    //             "name":"Áo Polo",
    //             // "code":"Polo123",
    //             "quantity": 1,
    //             "price": 200000,
    //             // "length": 12,
    //             // "width": 12,
    //             // "height": 12,
    //             "weight": 1200,
    //             "category":
    //             {
    //                 "level1":"Category Áo"
    //             }
    //         }
    //     ]
    // }
    if (
      !process.env.GHN_URL_CREATE ||
      !process.env.GHN_TOKEN ||
      !process.env.GHN_SHOP_ID
    )
      return NextResponse.json(
        { message: "Something went wrong with variant .env" },
        { status: 500 }
      )
    const GHN_Order = await fetch(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "c858b1c7-39c7-11ef-8e53-0a00184fe694",
          ShopId: "192789",
        },
        body: JSON.stringify(GHN_BODY),
      }
    )
    const res = await GHN_Order.json()
    console.log("GHN_Order", res)
    if (res.code === 400) {
      return NextResponse.json(
        { message: res.code_message_value },
        { status: 500 }
      )
    }
    if (res.message === "Success") {
      await shipment.findOneAndUpdate(
        { _id: shipment_id },
        { order_code: res.data.order_code, status: "DELIVERING" },
        { new: true }
      )
    }
    return NextResponse.json(
      { message: "Create Successfully!" },
      { status: 201 }
    )
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
