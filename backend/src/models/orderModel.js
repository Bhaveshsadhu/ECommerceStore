import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // vendor
            required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true },
        addressLine1: { type: String, required: true, trim: true },
        addressLine2: { type: String, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        postcode: { type: String, required: true, trim: true },
        country: { type: String, default: "Australia", trim: true },
        phone: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // customer
            required: true,
            index: true,
        },

        orderItems: {
            type: [orderItemSchema],
            validate: (v) => Array.isArray(v) && v.length > 0,
        },

        shippingAddress: {
            type: shippingAddressSchema,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "card", "paypal", "stripe", "other"],
            default: "COD",
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "pending",
                "processing",
                "packed",
                "shipped",
                "out-for-delivery",
                "delivered",
                "cancelled",
            ],
            default: "pending",
            index: true,
        },

        deliveryPartner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // delivery-partner
        },

        itemsPrice: { type: Number, required: true, default: 0 },
        shippingPrice: { type: Number, required: true, default: 0 },
        totalPrice: { type: Number, required: true, default: 0 },

        paidAt: Date,
        deliveredAt: Date,
    },
    { timestamps: true }
);

orderSchema.index({ "orderItems.vendor": 1 });
orderSchema.index({ deliveryPartner: 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;
