import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc   Get delivery partner stats
// @route  GET /api/delivery/stats
// @access Private (delivery-partner, admin)
export const getDeliveryStats = asyncHandler(async (req, res) => {
    const partnerId =
        req.user.role === "delivery-partner" ? req.user._id : req.query.partnerId;

    if (!partnerId) {
        res.status(400);
        throw new Error("Delivery partner ID is required");
    }

    const totalAssigned = await Order.countDocuments({
        deliveryPartner: partnerId,
    });

    const outForDelivery = await Order.countDocuments({
        deliveryPartner: partnerId,
        orderStatus: "out-for-delivery",
    });

    const delivered = await Order.countDocuments({
        deliveryPartner: partnerId,
        orderStatus: "delivered",
    });

    res.json({
        partnerId,
        totalAssigned,
        outForDelivery,
        delivered,
    });
});

// @desc   Get orders assigned to this delivery partner
// @route  GET /api/delivery/assigned-orders
// @access Private (delivery-partner, admin)
export const getAssignedOrders = asyncHandler(async (req, res) => {
    const partnerId =
        req.user.role === "delivery-partner" ? req.user._id : req.query.partnerId;

    if (!partnerId) {
        res.status(400);
        throw new Error("Delivery partner ID is required");
    }

    const statusFilter = req.query.status; // optional: pending, out-for-delivery, delivered, etc.

    const filter = {
        deliveryPartner: partnerId,
    };

    if (statusFilter) {
        filter.orderStatus = statusFilter;
    }

    const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .populate("user", "name email")
        .populate("orderItems.product", "name images")
        .populate("orderItems.vendor", "name");

    res.json(orders);
});

// @desc   Update delivery status for an order
// @route  PUT /api/delivery/orders/:id/status
// @access Private (delivery-partner, admin)
export const updateDeliveryStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    // Check permission: delivery partner assigned OR admin
    if (
        req.user.role !== "admin" &&
        (!order.deliveryPartner ||
            order.deliveryPartner.toString() !== req.user._id.toString())
    ) {
        res.status(403);
        throw new Error("You are not assigned to this order");
    }

    if (status === "out-for-delivery") {
        // Only allow if currently shipped/packed/processing/pending
        const allowedPrev = [
            "pending",
            "processing",
            "packed",
            "shipped",
            "out-for-delivery",
        ];
        if (!allowedPrev.includes(order.orderStatus)) {
            res.status(400);
            throw new Error("Cannot set this order to out-for-delivery");
        }
        order.orderStatus = "out-for-delivery";
    }

    if (status === "delivered") {
        // Only allow if already out-for-delivery
        if (order.orderStatus !== "out-for-delivery") {
            res.status(400);
            throw new Error("Order must be out-for-delivery before delivered");
        }
        order.orderStatus = "delivered";
        order.deliveredAt = new Date();
        if (order.paymentMethod === "COD") {
            order.paymentStatus = "paid";
            order.paidAt = new Date();
        }
    }

    const updated = await order.save();

    res.json({
        message: "Delivery status updated",
        order: updated,
    });
});
