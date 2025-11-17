import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (res, userId) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "30d" } // token validity
    );

    // Set JWT in cookie
    res.cookie("jwt", token, {
        httpOnly: true, // cannot be accessed from JS → protects against XSS
        secure: process.env.NODE_ENV === "production", // in production => HTTPS only
        sameSite: "strict", // CSRF protection
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return token;
};
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};
