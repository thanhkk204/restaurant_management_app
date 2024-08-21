import mongoose from "mongoose";

const userSchame = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
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
    role: {
        type: String,
        enum: ['CLIENT', 'ADMIN'],
        default: "CLIENT",
        required: true
    },
    emailVerified:{
        type: Date,
        default: null
    },
    gender: {
        type: String
    },
    accounts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "account",
        }
    ]
}, 
{
    timestamps: true
})

export default mongoose.models?.user || mongoose.model("user", userSchame)