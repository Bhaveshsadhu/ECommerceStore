import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
export const getMyCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
        "items.product",
        "name price images stock vendor"
    );

    if (!cart) {
        return res.json({
            user: req.user._id,
            items: [],
        });
    }

    res.json(cart);
});

// @desc    Add item to cart (or increase qty)
// @route   POST /api/cart/add
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive || !product.isApproved) {
        res.status(404);
        throw new Error("Product not found or not available");
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: [{ product: productId, qty }],
        });
    } else {
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.items.push({ product: productId, qty });
        }

        await cart.save();
    }

    const populatedCart = await cart.populate(
        "items.product",
        "name price images stock vendor"
    );

    res.status(201).json({
        message: "Cart updated",
        cart: populatedCart,
    });
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
    const { productId, qty } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
        res.status(404);
        throw new Error("Product not found in cart");
    }

    if (qty <= 0) {
        // remove item
        cart.items.splice(itemIndex, 1);
    } else {
        cart.items[itemIndex].qty = qty;
    }

    await cart.save();

    const populatedCart = await cart.populate(
        "items.product",
        "name price images stock vendor"
    );

    res.json({
        message: "Cart updated",
        cart: populatedCart,
    });
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
export const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialLength) {
        res.status(404);
        throw new Error("Product not found in cart");
    }

    await cart.save();

    const populatedCart = await cart.populate(
        "items.product",
        "name price images stock vendor"
    );

    res.json({
        message: "Item removed from cart",
        cart: populatedCart,
    });
});

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        return res.json({ message: "Cart already empty" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared" });
});
