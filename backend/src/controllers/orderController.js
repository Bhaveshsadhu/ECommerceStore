import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// Helper to calculate totals from cart items
const calculateTotals = (cartItems, productsMap) => {
    let itemsPrice = 0;

    const orderItems = cartItems.map((item) => {
        const product = productsMap[item.product.toString()];
        if (!product) {
            throw new Error("Product not found for cart item");
        }

        const linePrice = product.price * item.qty;
        itemsPrice += linePrice;

        return {
            product: product._id,
            vendor: product.vendor,
            name: product.name,
            price: product.price,
            qty: item.qty,
        };
    });

    const shippingPrice = itemsPrice > 100 ? 0 : 10; // simple rule
    const totalPrice = itemsPrice + shippingPrice;

    return { orderItems, itemsPrice, shippingPrice, totalPrice };
};

// @desc    Create order from cart
// @route   POST /api/orders
// @access  Private
export const createOrderFromCart = asyncHandler(async (req, res) => {
    const { shippingAddress, paymentMethod } = req.body;

    // Get cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error("Cart is empty");
    }

    // Get fresh product data for all items
    const productIds = cart.items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds }, isActive: true, isApproved: true });

    if (products.length !== cart.items.length) {
        res.status(400);
        throw new Error("Some products in your cart are no longer available");
    }

    // Build map for easy lookup
    const productsMap = {};
    products.forEach((p) => {
        productsMap[p._id.toString()] = p;
    });

    // calculate totals
    const { orderItems, itemsPrice, shippingPrice, totalPrice } = calculateTotals(
        cart.items,
        productsMap
    );

    // Create order
    const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paymentStatus: paymentMethod === "COD" ? "pending" : "pending", // later: integrate real payment
        orderStatus: "pending",
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
        message: "Order placed successfully",
        order,
    });
});

// @desc    Get my orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .populate("orderItems.product", "name images")
        .populate("orderItems.vendor", "name")
        .populate("deliveryPartner", "name");

    res.json(orders);
});

// @desc    Get single order (must be owner or admin)
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("orderItems.product", "name images price")
        .populate("orderItems.vendor", "name")
        .populate("deliveryPartner", "name");

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    // only owner or admin
    if (
        order.user._id.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
    ) {
        res.status(403);
        throw new Error("Not authorized to view this order");
    }

    res.json(order);
});
