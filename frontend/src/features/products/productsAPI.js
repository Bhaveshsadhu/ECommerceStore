import api from "../../api/axios";

// GET /api/products
export const fetchProductsRequest = (params = {}) =>
    api.get("/products", { params });

// GET /api/products/:id
export const fetchProductByIdRequest = (id) =>
    api.get(`/products/${id}`);
