import category from "@/lib/models/category"
import collection from "@/lib/models/collection"
import dish from "@/lib/models/dish"
import { connectToDB } from "@/lib/mongoDB"
import { FilteredProductType } from "@/types/type"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic';
export const GET = async (req: NextRequest) => {
    await connectToDB()
    try {
      await category.find({})
      await collection.find({})
      const dishes: FilteredProductType[] = await dish.find({}).populate('category_id').populate('collection_ids');
      return NextResponse.json({dishes}, { status: 201 })
    } catch (error) {
      console.log("Inventories_Error", error)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      )
    }
  }