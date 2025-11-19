import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import productsReducer from "../features/products/productsSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import ordersReducer from "../features/orders/ordersSlice.js";
import vendorReducer from "../features/vendor/vendorSlice.js";
import deliveryReducer from "../features/delivery/deliverySlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        vendor: vendorReducer,
        delivery: deliveryReducer,
    },
});

export default store;
