import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User with this email already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || "user",
    });

    const token = generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    if (user.isBlocked) {
        res.status(403);
        throw new Error("Your account has been blocked. Contact support.");
    }

    const token = generateTokenAndSetCookie(res, user._id);

    res.json({
        message: "Logged in successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({
        user: req.user,
    });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private (or public)
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.json({ message: "Logged out successfully" });
});
