import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema(
    {
        fullName: { type: String, trim: true },
        addressLine1: { type: String, trim: true },
        addressLine2: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postcode: { type: String, trim: true },
        country: { type: String, default: "Australia", trim: true },
        phone: { type: String, trim: true },
        isDefault: { type: Boolean, default: false },
    },
    { _id: false } // Prevent creation of separate _id for subdocument
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["user", "vendor", "delivery-partner", "admin"],
            default: "user",
            index: true,
        },

        addresses: [addressSchema],

        vendorProfile: {
            shopName: { type: String, trim: true },
            shopDescription: { type: String, trim: true },
            isApproved: { type: Boolean, default: false },
        },

        deliveryProfile: {
            vehicleType: { type: String, trim: true },
            vehicleNumber: { type: String, trim: true },
            isActive: { type: Boolean, default: true },
        },

        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 });

// Hash password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
