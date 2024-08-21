import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    expire: {
        type: Date,
        required: true
    }
}, 
{
    timestamps: true
})

export default mongoose.models?.verificationToken || mongoose.model("verificationToken", verificationTokenSchema)