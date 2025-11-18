import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";

import Product from "../models/productModel.js";
import products from "./data/products.js";

dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        await Product.deleteMany();
        console.log("🗑️ Products cleared");

        await Product.insertMany(products);
        console.log("🌱 Products seeded successfully!");

        process.exit();
    } catch (error) {
        console.error(`Seeding failed: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();

        await Product.deleteMany();
        console.log("🗑️ All products deleted");

        process.exit();
    } catch (error) {
        console.error(` Delete failed: ${error.message}`);
        process.exit(1);
    }
};

// node src/seed/seed.js -d
if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
