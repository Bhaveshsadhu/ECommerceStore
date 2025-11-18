import axiosClient from "./axiosClient";

export const getProducts = async () => {
  const response = await axiosClient.get("/products");
  return response.data?.products ?? response.data;
};

export const getProductById = async (id) => {
  const response = await axiosClient.get(`/products/${id}`);
  return response.data?.product ?? response.data;
};
