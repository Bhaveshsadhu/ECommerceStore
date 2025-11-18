import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import logger from "./utils/logger.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// HTTP request logging (via Winston)
app.use(
    morgan("dev", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

// Rate limit (basic)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "API is running" });
});

// ===== Routes =====
app.use("/api/auth", authRoutes);

// ===== Error handling =====
app.use(notFound);
app.use(errorHandler);

export default app;
