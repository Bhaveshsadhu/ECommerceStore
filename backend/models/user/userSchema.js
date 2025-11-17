import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        phone: {
            type: String,
            required: false,
        },

        role: {
            type: String,
            enum: ["user", "vendor", "delivery", "admin"],
            default: "user",
        },

        // For vendors
        shopName: {
            type: String,
            default: "",
        },
        shopDetails: {
            type: String,
            default: "",
        },

        // For delivery partners
        vehicleType: {
            type: String,
            enum: ["bike", "scooter", "car", "walker", ""],
            default: "",
        },
        licenseNumber: {
            type: String,
            default: "",
        },

        // User address for orders
        address: {
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            postalCode: { type: String, default: "" },
            country: { type: String, default: "Australia" },
        },

        // Profile image
        avatar: {
            type: String,
            default: "",
        },

        // Account status
        isActive: {
            type: Boolean,
            default: true,
        },

        // For JWT tokens
        refreshToken: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

const User = mongoose.model("User", userSchema);

export default User;
