import mongoose from "mongoose";

const kartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                min:0,
                default:0,
            }
        }
    ]
}, { timestamps: true });

const kartModel = mongoose.model("kart", kartSchema);

export default kartModel;