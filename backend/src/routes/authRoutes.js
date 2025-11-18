import express from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);
router.get("/me", protect, getCurrentUser);
router.post("/logout", protect, logoutUser);

export default router;
