import address from "@/lib/models/address"
import orderedDish from "@/lib/models/orderedDish"
import reservation from "@/lib/models/reservation"
import shipment from "@/lib/models/shipment"
import { connectToDB } from "@/lib/mongoDB"
import { AddressType, ReservationType, ShipmentType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic';
export const POST = async (req: NextRequest) => {
  const body = await req.json()
  console.log({ body })
  const {
    userName,
    user_id,
    note,
    phoneNumber,
    payment_method,
    orderedDishes,
    detailAddress,
    service_id,
    service_type_id,
    isPaidOnline,
    prepay,
    province,
    district,
    ward,
  } = body
  await connectToDB()
  try {
    if (!body)
      return NextResponse.json(
        { message: "All data are required" },
        { status: 401 }
      )

    const newAddress = (await address.create({
      province: province,
      district: district,
      ward: ward,
      detailAddress,
    })) as AddressType
    // 4: create shipment or reservation_id

    const newShipment = (await shipment.create({
      userName,
      user_id,
      phoneNumber,
      note,
      payment_method,
      service_id,
      service_type_id,
      isPaidOnline,
      prepay,
      addres_id: newAddress._id,
    })) as ShipmentType
    // create ordered dishes
    for (const dish of orderedDishes) {
      await orderedDish.create({
        shipment_id: newShipment._id,
        dish_id: dish.dish_id,
        quantity: dish.quantity,
      })
    }
    //   return

    return NextResponse.json(
      { message: "Succussfully!", shipment: newShipment },
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

export const GET = async (req: NextRequest) => {
  await connectToDB()
  try {
    const shipments = (await shipment
      .find({})
      .sort({ createdAt: -1 })
      .populate("addres_id")
      .populate("user_id")) as ShipmentType[]
    return NextResponse.json({ shipments }, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
