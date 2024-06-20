import mongoose from "mongoose";

const dishSchame = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: [
       {
        type: String,
        required: true
       }
    ],
    desc: {
        type: String,
    },
    isShow: {
        type: Boolean,
        required: true
    },
    category_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category',
    },
    collection_ids: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'collection',
        },
    ]

}, 
{
    timestamps: true
}
)

export default mongoose.models.dish || mongoose.model("dish", dishSchame)