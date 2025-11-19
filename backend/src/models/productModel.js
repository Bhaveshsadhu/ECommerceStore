import mongoose from "mongoose";
import "./categoryModel.js";

const imageSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        isThumbnail: { type: Boolean, default: false },
    },
    { _id: false }
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: false,
        },

        images: [imageSchema],

        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // role = vendor
            required: true,
            index: true,
        },

        isApproved: {
            type: Boolean,
            default: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Text search on name & description
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });


const Product = mongoose.model("Product", productSchema);
export default Product;
