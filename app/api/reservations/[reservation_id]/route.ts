import {
  DistricType,
  ProvinceType,
  ReservationType,
  WardType,
} from "@/lib/constants/type"
import reservation from "@/lib/models/reservation"
import { connectToDB } from "@/lib/mongoDb"
import { NextRequest, NextResponse } from "next/server"

const getLocation = async <T>(url: string): Promise<T> => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json()
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error("Can't get location")
  }
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { reservation_id: string } }
) => {
  const { reservation_id } = params
  if (!reservation_id)
    return NextResponse.json(
      { message: "Missing reservation_id" },
      { status: 401 }
    )
  await connectToDB()
  try {
    const reservationDetail = await reservation
      .findById(reservation_id)
      .populate("addres_id")
      .populate("table_id")
      .populate("user_id")
    if (!reservationDetail)
      return NextResponse.json(
        { message: "Can't find reservation" },
        { status: 401 }
      )

    //  1: get list of locations
    const province_id = reservationDetail.addres_id.province
    const district_id = reservationDetail.addres_id.district
    const ward_id = reservationDetail.addres_id.ward
    const provinces = await getLocation<ProvinceType[]>(
      "https://vapi.vnappmob.com/api/province"
    )
    const districts = await getLocation<DistricType[]>(
      "https://vapi.vnappmob.com/api/province/district/" + province_id
    )
    const wards = await getLocation<WardType[]>(
      "https://vapi.vnappmob.com/api/province/ward/" + district_id
    )
    // 2: find exactly location
    const prov = (await provinces).find(
      (item) => item.province_id === province_id
    )
    const dist = (await districts).find(
      (item) => item.district_id === district_id
    )
    const wa = (await wards).find((item) => item.ward_id === ward_id)

    // return a reservationDetail with name of address but not id
    return NextResponse.json(
      {
        reservationDetail: {
          ...reservationDetail._doc,
          addres_id: {
            ...reservationDetail.addres_id._doc,
            province: prov?.province_name,
            district: dist?.district_name,
            ward: wa?.ward_name,
          },
        },
      },
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { reservation_id: string } }
) {
  const { reservation_id } = params
  const body = await req.json()

  if (!reservation_id)
    return NextResponse.json(
      { message: "There is no Id to update reservation" },
      { status: 401 }
    )
  if (!body)
    return NextResponse.json(
      { message: "Body must be existed" },
      { status: 401 }
    )

  await connectToDB()
  try {
    const newreservation: any = await reservation.findByIdAndUpdate(
      { _id: reservation_id },
      body,
      { new: true }
    )
    return NextResponse.json(
      { message: "Successfully!", reservation: newreservation },
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
