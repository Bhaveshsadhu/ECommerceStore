import api from "../../api/axios";

// POST /api/orders
export const createOrderRequest = (payload) => api.post("/orders", payload);

// GET /api/orders/my
export const fetchMyOrdersRequest = () => api.get("/orders/my");

// GET /api/orders/:id
export const fetchOrderByIdRequest = (id) => api.get(`/orders/${id}`);
