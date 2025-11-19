import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// ========== DASHBOARD STATS ==========
// @desc   Get global admin stats
// @route  GET /api/admin/stats
// @access Private (admin)
export const getAdminStats = asyncHandler(async (req, res) => {
    const [totalUsers, totalVendors, totalDeliveryPartners, totalProducts, totalOrders] =
        await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: "vendor" }),
            User.countDocuments({ role: "delivery-partner" }),
            Product.countDocuments(),
            Order.countDocuments(),
        ]);

    const [pendingOrders, deliveredOrders] = await Promise.all([
        Order.countDocuments({ orderStatus: "pending" }),
        Order.countDocuments({ orderStatus: "delivered" }),
    ]);

    // Simple revenue sum (from all paid orders)
    const paidOrders = await Order.find({ paymentStatus: "paid" });
    let totalRevenue = 0;
    paidOrders.forEach((order) => {
        totalRevenue += order.totalPrice;
    });

    res.json({
        totalUsers,
        totalVendors,
        totalDeliveryPartners,
        totalProducts,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalRevenue,
    });
});

// ========== USER MANAGEMENT ==========
// @desc   Get all users
// @route  GET /api/admin/users
// @access Private (admin)
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 }).select("-password");
    res.json(users);
});

// @desc   Change user role
// @route  PUT /api/admin/users/:id/role
// @access Private (admin)
export const changeUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.role = role;
    const updated = await user.save();

    res.json({
        message: "User role updated",
        user: {
            id: updated._id,
            name: updated.name,
            email: updated.email,
            role: updated.role,
        },
    });
});

// @desc   Block user
// @route  PUT /api/admin/users/:id/block
// @access Private (admin)
export const blockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.isBlocked = true;
    await user.save();

    res.json({ message: "User blocked" });
});

// @desc   Unblock user
// @route  PUT /api/admin/users/:id/unblock
// @access Private (admin)
export const unblockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.isBlocked = false;
    await user.save();

    res.json({ message: "User unblocked" });
});

// ========== VENDOR MANAGEMENT ==========
// @desc   Get all vendors
// @route  GET /api/admin/vendors
// @access Private (admin)
export const getAllVendors = asyncHandler(async (req, res) => {
    const vendors = await User.find({ role: "vendor" })
        .sort({ createdAt: -1 })
        .select("-password");

    res.json(vendors);
});

// @desc   Approve vendor
// @route  PUT /api/admin/vendors/:id/approve
// @access Private (admin)
export const approveVendor = asyncHandler(async (req, res) => {
    const vendor = await User.findById(req.params.id);

    if (!vendor || vendor.role !== "vendor") {
        res.status(404);
        throw new Error("Vendor not found");
    }

    vendor.vendorProfile = vendor.vendorProfile || {};
    vendor.vendorProfile.isApproved = true;

    await vendor.save();

    res.json({ message: "Vendor approved" });
});

// @desc   Deactivate vendor
// @route  PUT /api/admin/vendors/:id/deactivate
// @access Private (admin)
export const deactivateVendor = asyncHandler(async (req, res) => {
    const vendor = await User.findById(req.params.id);

    if (!vendor || vendor.role !== "vendor") {
        res.status(404);
        throw new Error("Vendor not found");
    }

    vendor.vendorProfile = vendor.vendorProfile || {};
    vendor.vendorProfile.isApproved = false;

    await vendor.save();

    res.json({ message: "Vendor deactivated" });
});

// ========== DELIVERY PARTNER MANAGEMENT ==========
// @desc   Get all delivery partners
// @route  GET /api/admin/delivery-partners
// @access Private (admin)
export const getAllDeliveryPartners = asyncHandler(async (req, res) => {
    const partners = await User.find({ role: "delivery-partner" })
        .sort({ createdAt: -1 })
        .select("-password");

    res.json(partners);
});

// @desc   Activate delivery partner
// @route  PUT /api/admin/delivery-partners/:id/activate
// @access Private (admin)
export const activateDeliveryPartner = asyncHandler(async (req, res) => {
    const partner = await User.findById(req.params.id);

    if (!partner || partner.role !== "delivery-partner") {
        res.status(404);
        throw new Error("Delivery partner not found");
    }

    partner.deliveryProfile = partner.deliveryProfile || {};
    partner.deliveryProfile.isActive = true;

    await partner.save();

    res.json({ message: "Delivery partner activated" });
});

// @desc   Deactivate delivery partner
// @route  PUT /api/admin/delivery-partners/:id/deactivate
// @access Private (admin)
export const deactivateDeliveryPartner = asyncHandler(async (req, res) => {
    const partner = await User.findById(req.params.id);

    if (!partner || partner.role !== "delivery-partner") {
        res.status(404);
        throw new Error("Delivery partner not found");
    }

    partner.deliveryProfile = partner.deliveryProfile || {};
    partner.deliveryProfile.isActive = false;

    await partner.save();

    res.json({ message: "Delivery partner deactivated" });
});

// ========== ORDER MANAGEMENT ==========
// @desc   Get all orders (with optional filters)
// @route  GET /api/admin/orders
// @access Private (admin)
export const getAllOrders = asyncHandler(async (req, res) => {
    const status = req.query.status; // optional
    const paymentStatus = req.query.paymentStatus; // optional

    const filter = {};

    if (status) filter.orderStatus = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .populate("user", "name email")
        .populate("deliveryPartner", "name")
        .populate("orderItems.product", "name");

    res.json(orders);
});

// @desc   Get single order (admin)
// @route  GET /api/admin/orders/:id
// @access Private (admin)
export const getAdminOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("deliveryPartner", "name")
        .populate("orderItems.product", "name images price");

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    res.json(order);
});

// @desc   Update order status (admin)
// @route  PUT /api/admin/orders/:id/status
// @access Private (admin)
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    order.orderStatus = orderStatus;

    if (orderStatus === "delivered" && !order.deliveredAt) {
        order.deliveredAt = new Date();
    }

    const updated = await order.save();

    res.json({
        message: "Order status updated",
        order: updated,
    });
});

// @desc   Assign delivery partner to an order
// @route  PUT /api/admin/orders/:id/assign-delivery
// @access Private (admin)
export const assignDeliveryPartner = asyncHandler(async (req, res) => {
    const { deliveryPartnerId } = req.body;

    const partner = await User.findById(deliveryPartnerId);

    if (!partner || partner.role !== "delivery-partner") {
        res.status(404);
        throw new Error("Delivery partner not found");
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    order.deliveryPartner = deliveryPartnerId;

    const updated = await order.save();

    res.json({
        message: "Delivery partner assigned",
        order: updated,
    });
});
