import api from "../../api/axios";

// GET /api/delivery/stats
export const fetchDeliveryStatsRequest = () => api.get("/delivery/stats");

// GET /api/delivery/assigned-orders
export const fetchAssignedOrdersRequest = () =>
    api.get("/delivery/assigned-orders");

// PUT /api/delivery/orders/:id/status
export const updateDeliveryOrderStatusRequest = (id, status) =>
    api.put(`/delivery/orders/${id}/status`, { status });
