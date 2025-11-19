import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// @desc   Get vendor dashboard stats
// @route  GET /api/vendor/stats
// @access Private (vendor, admin)
export const getVendorStats = asyncHandler(async (req, res) => {
  const vendorId = req.user.role === "vendor" ? req.user._id : req.query.vendorId;

  if (!vendorId) {
    res.status(400);
    throw new Error("Vendor ID is required");
  }

  // Total products for this vendor
  const totalProducts = await Product.countDocuments({ vendor: vendorId });

  // All orders that include this vendor
  const vendorOrders = await Order.find({ "orderItems.vendor": vendorId });

  const totalOrders = vendorOrders.length;

  // Calculate revenue only from this vendor's items (for paid or delivered orders)
  let totalRevenue = 0;

  vendorOrders.forEach((order) => {
    const isPaidOrDelivered =
      order.paymentStatus === "paid" ||
      order.orderStatus === "delivered";

    if (!isPaidOrDelivered) return;

    order.orderItems.forEach((item) => {
      if (item.vendor.toString() === vendorId.toString()) {
        totalRevenue += item.price * item.qty;
      }
    });
  });

  res.json({
    vendorId,
    totalProducts,
    totalOrders,
    totalRevenue,
  });
});

// @desc   Get vendor orders (orders that contain vendor's products)
// @route  GET /api/vendor/orders
// @access Private (vendor, admin)
export const getVendorOrders = asyncHandler(async (req, res) => {
  const vendorId = req.user.role === "vendor" ? req.user._id : req.query.vendorId;

  if (!vendorId) {
    res.status(400);
    throw new Error("Vendor ID is required");
  }

  const orders = await Order.find({ "orderItems.vendor": vendorId })
    .sort({ createdAt: -1 })
    .populate("user", "name email")
    .populate("deliveryPartner", "name");

  // Optionally filter items to only this vendor's items in each order
  const filteredOrders = orders.map((order) => {
    const vendorItems = order.orderItems.filter(
      (item) => item.vendor.toString() === vendorId.toString()
    );

    return {
      _id: order._id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      user: order.user,
      deliveryPartner: order.deliveryPartner,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      items: vendorItems,
    };
  });

  res.json(filteredOrders);
});

// @desc   Get single vendor order (only items for this vendor)
// @route  GET /api/vendor/orders/:id
// @access Private (vendor, admin)
export const getVendorOrderById = asyncHandler(async (req, res) => {
  const vendorId = req.user.role === "vendor" ? req.user._id : req.query.vendorId;

  if (!vendorId) {
    res.status(400);
    throw new Error("Vendor ID is required");
  }

  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("deliveryPartner", "name");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Check that this order actually has items for this vendor
  const vendorItems = order.orderItems.filter(
    (item) => item.vendor.toString() === vendorId.toString()
  );

  if (vendorItems.length === 0) {
    res.status(403);
    throw new Error("You are not authorized to view this order");
  }

  res.json({
    _id: order._id,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    user: order.user,
    deliveryPartner: order.deliveryPartner,
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
    items: vendorItems,
    shippingAddress: order.shippingAddress,
  });
});
