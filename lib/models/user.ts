import mongoose from "mongoose";

const userSchame = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    address: {
        type: mongoose.Schema.ObjectId,
        ref: "address",
    },
    gender: {
        type: String
    },
}, 
{
    timestamps: true
}
)

export default mongoose.models.user || mongoose.model("user", userSchame)