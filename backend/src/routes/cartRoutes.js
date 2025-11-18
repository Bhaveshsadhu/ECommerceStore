import express from "express";
import {
    getMyCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import {
    addToCartSchema,
    updateCartItemSchema,
} from "../validations/cartValidation.js";

const router = express.Router();

// All cart routes are for logged-in users
router.use(protect);

// Get my cart
router.get("/", getMyCart);

// Add item to cart
router.post("/add", validateBody(addToCartSchema), addToCart);

// Update item qty
router.put("/update", validateBody(updateCartItemSchema), updateCartItem);

// Remove specific item
router.delete("/remove/:productId", removeCartItem);

// Clear entire cart
router.delete("/clear", clearCart);

export default router;
