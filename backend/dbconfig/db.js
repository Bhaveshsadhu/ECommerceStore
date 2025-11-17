import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const connectDb = () => {
    try {
        if (mongoose.connect(process.env.MONGO_URL)) {
            console.log("Database connected successfully");
            return true;
        }
    } catch (error) {
        next(error)
    }
};