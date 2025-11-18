import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Get all products (with filters + pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
    const vendor = req.query.vendor || "";

    const filter = {
        isActive: true,
        isApproved: true,
    };

    if (keyword) {
        filter.$or = [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ];
    }

    if (category) {
        filter.category = category;
    }

    if (vendor) {
        filter.vendor = vendor;
    }

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .populate("vendor", "name email")
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        products,
    });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate("vendor", "name email")
        .populate("category", "name");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.json(product);
});

// @desc    Get current vendor's products
// @route   GET /api/products/vendor/me
// @access  Private (vendor or admin)
export const getMyVendorProducts = asyncHandler(async (req, res) => {
    const filter = {};

    if (req.user.role === "vendor") {
        filter.vendor = req.user._id;
    }

    // Admin can pass ?vendorId=
    if (req.user.role === "admin" && req.query.vendorId) {
        filter.vendor = req.query.vendorId;
    }

    const products = await Product.find(filter)
        .populate("category", "name")
        .sort({ createdAt: -1 });

    res.json(products);
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (vendor, admin)
export const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, stock, category, images } = req.body;

    let vendorId;

    if (req.user.role === "vendor") {
        vendorId = req.user._id;
    } else if (req.user.role === "admin") {
        // Admin can create for a vendor if vendorId is sent in body
        vendorId = req.body.vendor || req.user._id;
    } else {
        res.status(403);
        throw new Error("Only vendors or admins can create products");
    }

    const product = await Product.create({
        name,
        description,
        price,
        stock,
        category: category || undefined,
        images: images || [],
        vendor: vendorId,
        isApproved: req.user.role === "admin" ? true : false, // if you want approval flow
    });

    res.status(201).json({
        message: "Product created successfully",
        product,
    });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (vendor owner or admin)
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    // Check permission: vendor who owns it or admin
    if (
        req.user.role !== "admin" &&
        product.vendor.toString() !== req.user._id.toString()
    ) {
        res.status(403);
        throw new Error("Not authorized to update this product");
    }

    const fieldsToUpdate = [
        "name",
        "description",
        "price",
        "stock",
        "category",
        "images",
        "isActive",
    ];

    fieldsToUpdate.forEach((field) => {
        if (typeof req.body[field] !== "undefined") {
            product[field] = req.body[field];
        }
    });

    // Only admin can change approval status
    if (typeof req.body.isApproved !== "undefined" && req.user.role === "admin") {
        product.isApproved = req.body.isApproved;
    }

    const updatedProduct = await product.save();

    res.json({
        message: "Product updated successfully",
        product: updatedProduct,
    });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (vendor owner or admin)
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (
        req.user.role !== "admin" &&
        product.vendor.toString() !== req.user._id.toString()
    ) {
        res.status(403);
        throw new Error("Not authorized to delete this product");
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
});

// @desc    Approve product (admin)
// @route   PATCH /api/products/:id/approve
// @access  Private (admin)
export const approveProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    product.isApproved = true;
    product.isActive = true;

    const updated = await product.save();

    res.json({
        message: "Product approved",
        product: updated,
    });
});
