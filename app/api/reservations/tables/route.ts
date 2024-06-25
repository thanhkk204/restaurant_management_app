import { TableType } from "@/app/(admin)/dashboard/reservations/page";
import table from "@/lib/models/table";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
   await connectToDB()
   try {
    const {location_id, order} = await req.json()
    if(!location_id || !order) return NextResponse.json({message: "All data are required"}, {status: 401})
    const newTable = await table.create({order: order, location_id: location_id})
   return NextResponse.json({newTable, message: 'Succussfully!'}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export const GET = async (req: NextRequest) => {
   await connectToDB()
   try {
   const tables = await table.find({}).sort({ order: 1 }) as TableType[]
   const numberOfTable: number = await table.find().countDocuments() + 1
   return NextResponse.json({tables, numberOfTable }, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export const DELETE = async (req: NextRequest) => {
   await connectToDB()
   try {
      const IdsArray = await req.json()
   const tables: any = await table.deleteMany({ _id: {$in: IdsArray}})
   return NextResponse.json({tables, message: "Successfully!"}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
export const PUT = async (req: NextRequest)=>{
   const {newArray} = await req.json()
   await connectToDB()
   const tableArray = newArray as TableType[]
   if(!newArray) return NextResponse.json({message: "Array for update is currently empty"}, {status: 401})
   try {
      tableArray.forEach((item, index) => {
        updateFornewTable(item, index)
     });
      return NextResponse.json({message: "Successfully"}, {status: 201})
   } catch (error) {
      console.log(error)
   }
}

const updateFornewTable = async (item: TableType, index: number) =>{
   await table.findByIdAndUpdate({_id: item._id}, {order: index})
}