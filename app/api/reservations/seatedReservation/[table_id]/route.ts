import { TableType } from "@/app/(admin)/dashboard/reservations/page"
import address from "@/lib/models/address"
import reservation from "@/lib/models/reservation"
import table from "@/lib/models/table"
import { ReservationType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest, {params}: {params: {table_id:string}}) => {
    const {table_id} = params
    if(!table_id) return NextResponse.json({message: "Missing table id"}, {status: 201})
   try {
     const tableDetail = await table.findById(table_id) as TableType
     let reservationDetail: ReservationType
     await address.find({})
     if(tableDetail.status === "ISBOOKED"){
          reservationDetail = await reservation.findOne({
                table_id: table_id,
                status: "RESERVED",
                prepay: { $gt: 0 },
                startTime: { $gte: new Date()}
                })
                .populate('addres_id')
                .populate('user_id')
                .populate('table_id')
                .sort({ startTime: 1 })
                .exec();
          return NextResponse.json({reservationDetail}, {status: 201})
     }else if(tableDetail.status === "ISSERVING"){
          reservationDetail = await reservation.findOne({table_id: table_id, status: "SEATED"}).populate('addres_id').populate('user_id').populate('table_id')
          return NextResponse.json({reservationDetail}, {status: 201})
     }
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
