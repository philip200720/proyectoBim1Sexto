import { Schema, model } from "mongoose";

const cartSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required"]
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Product reference is required"]
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                min: [1, "Quantity must be at least 1"]
            }
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

export default model("Cart", cartSchema);
