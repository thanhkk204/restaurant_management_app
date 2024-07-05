import mongoose from "mongoose"

const deliverySchame = new mongoose.Schema(
  {
    userName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
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
        required: true
    },
    status: {
      type: String,
      enum: ["RESERVED", "SEATED", "COMPLETED", "CANCELED"],
      default: "RESERVED",
    },
    prepay: {
        type: Number,
        default: 0
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.delivery || mongoose.model("delivery", deliverySchame)
