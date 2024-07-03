import { TableType } from "@/app/(admin)/dashboard/reservations/page"
import { ReservationType } from "@/lib/constants/type"
import address from "@/lib/models/address"
import reservation from "@/lib/models/reservation"
import table from "@/lib/models/table"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, {params}: {params: {id:string}}) => {
    const table_id = params.id
    if(!table_id) return NextResponse.json({message: "Missing table id"}, {status: 201})
   try {
     const tableDetail = await table.findById(table_id) as TableType
     let reservationDetail: ReservationType

     if(tableDetail.status === "ISBOOKED"){
          await address.find({})
          reservationDetail = await reservation.findOne({table_id: table_id, status: "RESERVED"}).populate('addres_id').populate('user_id')
          return NextResponse.json({reservationDetail}, {status: 201})
     }else if(tableDetail.status === "ISSERVING"){
          reservationDetail = await reservation.findOne({table_id: table_id, status: "SEATED"}).populate('addres_id').populate('user_id')
          return NextResponse.json({reservationDetail}, {status: 201})
     }
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
