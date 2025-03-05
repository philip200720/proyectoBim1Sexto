import { Schema, model } from "mongoose"

const productSchema = Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: true,
        maxLength: [100, "Product name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [500, "Description cannot exceed 500 characters"]
    },
    productPicture:{
        type: String,
        required: [true, "Product picture is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    stock: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: [0, "Stock cannot be negative"]
    },
    sold: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"]
    }
}, {
    timestamps: true,
    versionKey: false,
})

export default model("Product", productSchema);