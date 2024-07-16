import { AddressType, DistricType, OrderedFoodType, ProvinceType, ReservationType, ShipmentType, WardType } from "@/lib/constants/type";
import address from "@/lib/models/address";
import dish from "@/lib/models/dish";
import orderedDish from "@/lib/models/orderedDish";
import reservation from "@/lib/models/reservation";
import shipment from "@/lib/models/shipment";
import table from "@/lib/models/table";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const {
         orderType,
         userName,
         user_id,
         note,
         phoneNumber,
         payment_method,
         orderedDishes,
         detailAddress,
         service_id,
         service_type_id,
         isPaidOnline,
         prepay,
         province,
         district, 
         ward,
        // if it's reservation
         party_size,
         table_id,
         startTime,
         endTime
        } = body
   await connectToDB()
   try {
    if(!body) return NextResponse.json({message: "All data are required"}, {status: 401})

    const newAddress= await address.create({
        province: province,
        district: district,
        ward: ward,
        detailAddress
        }) as AddressType
    // 4: create shipment or reservation
    if(orderType === 'shipment'){
       const newShipment = await shipment.create({
            userName,
            // user_id,
            phoneNumber,
            note,
            payment_method,
            service_id,
            service_type_id,
            isPaidOnline,
            prepay,
            addres_id: newAddress._id
        })  as ShipmentType
    // create ordered dishes
        for (const dish of orderedDishes) {
            await orderedDish.create({
            shipment_id: newShipment._id,
            dish_id: dish.dish_id,
            quantity: dish.quantity,
            })
        }
    //   return
    return NextResponse.json({message: 'Succussfully!', shipment: newShipment}, {status: 201})
    }else if(orderType === 'reservation'){
    const reverTable_id = table_id === "" ? null : table_id
    const newReservation  = await reservation.create({
        userName,
        // user_id,
        phoneNumber,
        party_size,
        payment_method,
        table_id: reverTable_id,
        prepay,
        startTime,
        endTime,
        addres_id: newAddress._id
    })  as ReservationType
    // create ordered dishes
        for (const dish of orderedDishes) {
        await orderedDish.create({
        reservation_id: newReservation._id,
        dish_id: dish.dish_id,
        quantity: dish.quantity,
        })
        }
    return NextResponse.json({message: 'Succussfully!', reservation: newReservation}, {status: 201})
    }
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}

export const GET = async (req: NextRequest) => {
   await connectToDB()
   try {
   const  shipments = await shipment.find({}).sort({ createdAt: -1 }).populate('addres_id').populate('user_id') as ShipmentType[]
   return NextResponse.json({shipments}, {status: 201})
   } catch (error) {
    console.log("Inventories_Error", error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
   }
}
