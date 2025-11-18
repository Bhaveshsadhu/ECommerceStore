import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { createOrderSchema } from "../validations/orderValidation.js";
import {
    createOrderFromCart,
    getMyOrders,
    getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

// All order routes require login
router.use(protect);

// Create order (from cart)
router.post("/", validateBody(createOrderSchema), createOrderFromCart);

// Get my orders
router.get("/my", getMyOrders);

// Get order by id
router.get("/:id", getOrderById);

export default router;
