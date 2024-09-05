import category from "@/lib/models/category"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await req.json()
  if (!id)
    return NextResponse.json("There is no Id to update collection", {
      status: 500,
    })
  if (!body)
    return NextResponse.json("There is no body to update collection", {
      status: 500,
    })

  await connectToDB()
  try {
    const newCategory: any = await category.findByIdAndUpdate({ _id: id }, body)
    return NextResponse.json(
      { message: "Update Successfully!", newCategory },
      { status: 201 }
    )
  } catch (error) {
    console.log("Inventories_Error", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!id)
    return NextResponse.json("There is no Id to get detail collection", {
      status: 500,
    })

  await connectToDB()
  try {
    const newCategory: any = await category.findOne({ _id: id })
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
