import collection from "@/lib/models/collection"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const body = await req.json()
  console.log(body)
  if (!id)
    return NextResponse.json(
      { message: "There is no Id to update collection" },
      { status: 500 }
    )
  if (!body)
    return NextResponse.json(
      { message: "There is no body to update collection" },
      { status: 500 }
    )

  await connectToDB()
  try {
    const newCollection: any = await collection.findByIdAndUpdate(
      { _id: id },
      body
    )
    return NextResponse.json(
      { message: "Update Successfully!", newCollection },
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
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  if (!id)
    return NextResponse.json(
      { message: "There is no Id to get detail collection" },
      { status: 500 }
    )

  await connectToDB()
  try {
    const newCollection: any = await collection.findOne({ _id: id })
    return NextResponse.json(newCollection, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
