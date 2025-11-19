import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
    getVendorStats,
    getVendorOrders,
    getVendorOrderById,
} from "../controllers/vendorController.js";

const router = express.Router();

// all vendor routes require auth + vendor/admin role
router.use(protect, authorizeRoles("vendor", "admin"));

// GET /api/vendor/stats
router.get("/stats", getVendorStats);

// GET /api/vendor/orders
router.get("/orders", getVendorOrders);

// GET /api/vendor/orders/:id
router.get("/orders/:id", getVendorOrderById);

export default router;
