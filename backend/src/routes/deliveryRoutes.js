import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
    getDeliveryStats,
    getAssignedOrders,
    updateDeliveryStatus,
} from "../controllers/deliveryController.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { updateDeliveryStatusSchema } from "../validations/deliveryValidation.js";

const router = express.Router();

// all delivery routes require login + role
router.use(protect, authorizeRoles("delivery-partner", "admin"));

// GET /api/delivery/stats
router.get("/stats", getDeliveryStats);

// GET /api/delivery/assigned-orders
router.get("/assigned-orders", getAssignedOrders);

// PUT /api/delivery/orders/:id/status
router.put(
    "/orders/:id/status",
    validateBody(updateDeliveryStatusSchema),
    updateDeliveryStatus
);

export default router;
