import express from "express";
import {
    getProducts,
    getProductById,
    getMyVendorProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    approveProduct,
} from "../controllers/productController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import {
    createProductSchema,
    updateProductSchema,
} from "../validations/productValidation.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Vendor / Admin: see their products
router.get(
    "/vendor/me/products",
    protect,
    authorizeRoles("vendor", "admin"),
    getMyVendorProducts
);

// Create product (vendor or admin)
router.post(
    "/",
    protect,
    authorizeRoles("vendor", "admin"),
    validateBody(createProductSchema),
    createProduct
);

// Update product
router.put(
    "/:id",
    protect,
    authorizeRoles("vendor", "admin"),
    validateBody(updateProductSchema),
    updateProduct
);

// Delete product
router.delete(
    "/:id",
    protect,
    authorizeRoles("vendor", "admin"),
    deleteProduct
);

// Approve product (admin only)
router.patch(
    "/:id/approve",
    protect,
    authorizeRoles("admin"),
    approveProduct
);

export default router;
