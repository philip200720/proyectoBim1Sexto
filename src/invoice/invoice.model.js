import { Schema, model } from "mongoose";

const invoiceSchema = Schema({
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
    ],
    total: {
        type: Number,
        required: [true, "Total amount is required"],
        min: [0, "Total must be a positive number"]
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Invoice", invoiceSchema);