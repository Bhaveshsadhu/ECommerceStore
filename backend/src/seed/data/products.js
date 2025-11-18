// backend/src/seed/data/products.js

const products = [
    {
        name: "Wireless Bluetooth Headphones",
        slug: "wireless-bluetooth-headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        price: 79.99,
        stock: 50,
        category: null, // fill after category seeder if you want
        vendor: "64f1b2c2d4399c0c12345678", // <-- replace with real vendor _id
        images: [
            {
                url: "https://picsum.photos/seed/headphones/600/400",
                isThumbnail: true,
            },
        ],
    },
    {
        name: "Smart LED TV 50 inch",
        slug: "smart-led-tv-50-inch",
        description: "4K Ultra HD Smart LED TV with Netflix and YouTube.",
        price: 499.99,
        stock: 12,
        category: null,
        vendor: "64f1b2c2d4399c0c12345678",
        images: [
            {
                url: "https://picsum.photos/seed/tv/600/400",
                isThumbnail: true,
            },
        ],
    },
    {
        name: "Gaming Mouse RGB",
        slug: "gaming-mouse-rgb",
        description:
            "High precision gaming mouse with RGB lights and adjustable DPI.",
        price: 29.99,
        stock: 100,
        category: null,
        vendor: "64f1b2c2d4399c0c12345678",
        images: [
            {
                url: "https://picsum.photos/seed/mouse/600/400",
                isThumbnail: true,
            },
        ],
    },
    {
        name: "Mens Running Shoes",
        slug: "mens-running-shoes",
        description: "Breathable mesh running shoes for daily workouts.",
        price: 39.99,
        stock: 60,
        category: null,
        vendor: "64f1b2c2d4399c0c12345678",
        images: [
            {
                url: "https://picsum.photos/seed/shoes/600/400",
                isThumbnail: true,
            },
        ],
    },
    {
        name: "Women Handbag",
        slug: "women-handbag",
        description: "Premium handbag made with faux leather.",
        price: 49.99,
        stock: 30,
        category: null,
        vendor: "64f1b2c2d4399c0c12345678",
        images: [
            {
                url: "https://picsum.photos/seed/handbag/600/400",
                isThumbnail: true,
            },
        ],
    },
];

export default products;
