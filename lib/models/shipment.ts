import mongoose from "mongoose"

const shipmentSchame = new mongoose.Schema(
  {
    order_code: {
      type: String,
      default: null
    },
    userName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    note: {
        type: String,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    addres_id: {
      type: mongoose.Schema.ObjectId,
      ref: "address"
    },
    dish_id: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "orderedDish",
      },
    ],
    payment_method: {
        type: String,
        enum: ["CASHPAYMENT", "BANKPAYMENT"],
        default: "CASHPAYMENT",
    },
    service_id: {
        type: Number,
        required: true
    },
    service_type_id: {
        type: Number,
    },
    status: {
      type: String,
      enum: ["RESERVED","DELIVERING", "COMPLETED", "CANCELED"],
      default: "RESERVED",
    },
    prepay: {
        type: Number,
        default: 0
    },
    isPaidOnline: {
        type: Boolean,
        required: true
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.shipment || mongoose.model("shipment", shipmentSchame)
