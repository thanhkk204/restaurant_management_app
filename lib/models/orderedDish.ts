import mongoose from "mongoose";

const orderedDishSchame = new mongoose.Schema({
    dish_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'dish'
    },
    reservation_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'reservation'
    },
    shipment_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'shipment'
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    isOrderedOnline: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
}
)

export default mongoose.models.orderedDish || mongoose.model("orderedDish", orderedDishSchame)