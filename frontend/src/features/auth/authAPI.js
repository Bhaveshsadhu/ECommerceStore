import api from "../../api/axios";

// Adjust if your backend response shape is different
export const registerRequest = (payload) =>
    api.post("/auth/register", payload);

export const loginRequest = (payload) =>
    api.post("/auth/login", payload);

export const fetchMeRequest = () =>
    api.get("/auth/me");

export const logoutRequest = () =>
    api.post("/auth/logout");
