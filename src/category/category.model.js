import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        maxLength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        maxLength: [250, "Description cannot exceed 250 characters"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default model("Category", categorySchema);