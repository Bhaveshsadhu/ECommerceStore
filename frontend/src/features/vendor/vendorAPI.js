import api from "../../api/axios";

// GET /api/vendor/stats
export const fetchVendorStatsRequest = (params = {}) =>
    api.get("/vendor/stats", { params });

// GET /api/vendor/orders
export const fetchVendorOrdersRequest = (params = {}) =>
    api.get("/vendor/orders", { params });

// GET /api/vendor/orders/:id
export const fetchVendorOrderByIdRequest = (id) =>
    api.get(`/vendor/orders/${id}`);

// GET /api/products/vendor/me
export const fetchVendorProductsRequest = () =>
    api.get("/products/vendor/me");
