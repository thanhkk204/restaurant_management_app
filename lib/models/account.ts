import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    type: {
        type: String,
    },
    provider: {
        type: String,
    },
    access_token: {
        type: String
    },
    providerAccountId: {
        type: String,
        unique: true
    },
    refresh_token: {
        type: String
    },
    expires_at: {
        type: Number
    },
    token_type: {
        type: String
    },
    scope: {
        type: String
    },
    id_token: {
        type: String
    },
    session_state: {
        type: String
    },
}, 
{
    timestamps: true
})

export default mongoose.models?.account || mongoose.model("account", accountSchema)