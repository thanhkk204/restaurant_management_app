import mongoose from "mongoose"

const reservationSchame = new mongoose.Schema(
  {
    table_id: {
      type: mongoose.Schema.ObjectId,
      ref: "table",
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    userName: {
        type: String
    },
    address: {
        type: String
    },
    party_size: {
        type: Number,
        default: 1,
      },
    dish_id: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "dish",
      },
    ],
    payment_method: {
        required: true,
        enum: ["CASHPAYMENT", "BANKPAYMENT"],
        default: "CASHPAYMENT",
    },
    status: {
      type: String,
      required: true,
      enum: ["RESERVED", "DELIVERY", "SEATED", "COMPLETED", "CANCELED"],
      default: "RESERVED",
    },
    prepay: {
        type: Number
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.reservation || mongoose.model("reservation", reservationSchame)
