import api from "../../api/axios";

// GET /api/cart
export const fetchCartRequest = () => api.get("/cart");

// POST /api/cart/add
export const addToCartRequest = (payload) => api.post("/cart/add", payload);

// PUT /api/cart/update
export const updateCartItemRequest = (payload) =>
    api.put("/cart/update", payload);

// DELETE /api/cart/remove/:productId
export const removeCartItemRequest = (productId) =>
    api.delete(`/cart/remove/${productId}`);

// DELETE /api/cart/clear
export const clearCartRequest = () => api.delete("/cart/clear");
