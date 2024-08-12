import { OrderedFoodType } from "@/lib/constants/type"
import orderedDish from "@/lib/models/orderedDish"
import { connectToDB } from "@/lib/mongoDb"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const { dish_id, reservation_id } = await req.json()
  if (!reservation_id || !dish_id)
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 401 }
    )
  await connectToDB()
  try {
    const orderedFood = (await orderedDish.create({
      reservation_id,
      dish_id,
    })) as OrderedFoodType
    // retrun newest orderedFood with address populate
    const newestOrderedFood = await orderedDish
      .findById(orderedFood._id)
      .populate("dish_id")

    return NextResponse.json(
      { orderedFood: newestOrderedFood },
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
