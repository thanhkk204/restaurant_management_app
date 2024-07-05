import { TableType } from "@/app/(admin)/dashboard/reservations/page";
import { AddressType, DistricType, ProvinceType, ReservationType, WardType } from "@/lib/constants/type";
import address from "@/lib/models/address";
import reservation from "@/lib/models/reservation";
import table from "@/lib/models/table";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const {
         table_id,
         userName,
         party_size,
         payment_method,
         detailAddress,
         province,
         district, 
         ward 
        } = await req.json()
   await connectToDB()
   try {
    if(!userName || !party_size || !payment_method || !detailAddress || !province || !district || !ward) return NextResponse.json({message: "All data are required"}, {status: 401})

    const newAddress= await address.create({
        province: province,
        district: district,
        ward: ward,
        detailAddress
        }) as AddressType
    // 4: create reservation
    const newReservation = await reservation.create({
        userName,
        party_size,
        payment_method,
        table_id,
        status: "SEATED",
        addres_id: newAddress._id
    })  as ReservationType
    // 5: if create reservation successfully update table status 
    if(newReservation){
        const newTable = await table.findByIdAndUpdate({_id: table_id}, {status:'ISSERVING'}, {new:true})
    }
   return NextResponse.json({message: 'Succussfully!', reservation: newReservation}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export const GET = async (req: NextRequest) => {
    const stt = req.nextUrl.searchParams.get("status")
   await connectToDB()
   console.log(stt)
   try {
    let reservations: ReservationType[];
    if(stt === 'all'){
         reservations = await reservation.find({}).sort({ createdAt: -1 }).populate('addres_id').populate('user_id').populate('table_id').populate('dish_id') as ReservationType[]
    }else{
         reservations = await reservation.find({status: stt}).sort({ createdAt: -1 }).populate('addres_id').populate('user_id').populate('table_id').populate('dish_id') as ReservationType[]
    }
   return NextResponse.json({reservations}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

