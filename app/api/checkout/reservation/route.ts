
import location from "@/lib/models/location";
import table from "@/lib/models/table";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

// Get table available
export const GET = async (req: NextRequest) => {
    await connectToDB()
    try {
    await location.find({})
    const tables = await table.find({status: { $ne: 'ISSERVING' }}).populate('location_id').sort({ order: 1 })
    return NextResponse.json({tables}, {status: 201})
    } catch (error) {
     console.log("Inventories_Error", error)
     return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
 }