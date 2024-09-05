import dish from "@/lib/models/dish"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  await connectToDB()
  try {
    const { title, price, desc, image, category_id, collection_ids } =
      await req.json()

    if (!title || !desc || !image || !collection_ids || !price || !category_id)
      return NextResponse.json(
        { message: "All data are required" },
        { status: 401 }
      )
    const existedData = await dish.findOne({ title })
    if (existedData)
      return NextResponse.json(
        { message: "dish is available" },
        { status: 401 }
      )
    const newdish = await dish.create({
      title,
      price,
      desc,
      image,
      category_id,
      collection_ids,
    })
    return NextResponse.json(
      { newdish, message: "Succussfully!" },
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
    const dishs: any = await dish.find({})
    return NextResponse.json(dishs, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export const DELETE = async (req: NextRequest) => {
  await connectToDB()
  try {
    const IdsArray = await req.json()
    const dishs: any = await dish.deleteMany({ _id: { $in: IdsArray } })
    return NextResponse.json(
      { dishs, message: "Successfully!" },
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
