import orderedDish from "@/lib/models/orderedDish"
import reservation from "@/lib/models/reservation"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderedDish_id = params.id
  const { quantity } = await req.json()
  if (!orderedDish_id)
    return NextResponse.json(
      { message: "There is no Id to update ordered dish" },
      { status: 401 }
    )
  if (!quantity)
    return NextResponse.json(
      { message: "All data are required" },
      { status: 401 }
    )
  await connectToDB()
  try {
    const updatedDish: any = await orderedDish.findByIdAndUpdate(
      { _id: orderedDish_id },
      { quantity: quantity },
      { new: true }
    )
    return NextResponse.json(
      { message: "Update Successfully!", orderedFood: updatedDish },
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
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderedDish_id = params.id
  if (!orderedDish_id)
    return NextResponse.json(
      { message: "There is no Id to delete ordered dish" },
      { status: 401 }
    )
  await connectToDB()
  try {
    const deletedOrderedFood: any = await orderedDish.findByIdAndDelete(
      orderedDish_id
    )

    return NextResponse.json({ message: "Successfully" }, { status: 201 })
  } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
