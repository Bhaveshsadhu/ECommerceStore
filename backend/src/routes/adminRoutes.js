import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { validateBody } from "../middlewares/validateMiddleware.js";

import {
    getAdminStats,
    getAllUsers,
    changeUserRole,
    blockUser,
    unblockUser,
    getAllVendors,
    approveVendor,
    deactivateVendor,
    getAllDeliveryPartners,
    activateDeliveryPartner,
    deactivateDeliveryPartner,
    getAllOrders,
    getAdminOrderById,
    updateOrderStatus,
    assignDeliveryPartner,
} from "../controllers/adminController.js";

import {
    changeUserRoleSchema,
    updateOrderStatusSchema,
    assignDeliveryPartnerSchema,
} from "../validations/adminValidation.js";

const router = express.Router();

// all routes require admin
router.use(protect, authorizeRoles("admin"));

// Dashboard stats
router.get("/stats", getAdminStats);

// Users
router.get("/users", getAllUsers);
router.put(
    "/users/:id/role",
    validateBody(changeUserRoleSchema),
    changeUserRole
);
router.put("/users/:id/block", blockUser);
router.put("/users/:id/unblock", unblockUser);

// Vendors
router.get("/vendors", getAllVendors);
router.put("/vendors/:id/approve", approveVendor);
router.put("/vendors/:id/deactivate", deactivateVendor);

// Delivery partners
router.get("/delivery-partners", getAllDeliveryPartners);
router.put("/delivery-partners/:id/activate", activateDeliveryPartner);
router.put("/delivery-partners/:id/deactivate", deactivateDeliveryPartner);

// Orders
router.get("/orders", getAllOrders);
router.get("/orders/:id", getAdminOrderById);
router.put(
    "/orders/:id/status",
    validateBody(updateOrderStatusSchema),
    updateOrderStatus
);
router.put(
    "/orders/:id/assign-delivery",
    validateBody(assignDeliveryPartnerSchema),
    assignDeliveryPartner
);

export default router;
