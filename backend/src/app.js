import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import logger from "./utils/logger.js";

const app = express();

// Logging incoming requests
app.use(
    morgan("dev", {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

// Security
app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

export default app;
