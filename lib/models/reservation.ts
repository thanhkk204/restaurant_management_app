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
    phoneNumber: {
        type: String
    },
    addres_id: {
      type: mongoose.Schema.ObjectId,
      ref: "address"
    },
    party_size: {
        type: Number,
        default: 1,
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
    status: {
      type: String,
      enum: ["RESERVED", "SEATED", "COMPLETED", "CANCELED"],
      default: "RESERVED",
    },
    prepay: {
        type: Number,
        default: 0
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.reservation || mongoose.model("reservation", reservationSchame)
