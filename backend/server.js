import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from "express-rate-limit";

import { connectDb } from './dbconfig/db.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

import userRoutes from './routes/user/user.routes.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT || 5000, () => {
    if (connectDb()) {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    }
    else {
        console.log("Failed to connect to the database. Server not started.");
    }
});

//Global rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests
    message: {
        message: "Too many requests from this IP. Please try again later."
    }
});




app.use(limiter); //Apply to all routes

// Routes
app.use('/api/users', userRoutes);
app.use(errorHandler); // Error Handler Middleware
