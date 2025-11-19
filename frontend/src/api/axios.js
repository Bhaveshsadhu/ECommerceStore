import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // send cookies (for JWT httpOnly cookie)
});

// Optional: response interceptor to handle 401 later
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // You can add global error handling / logout logic here later
        return Promise.reject(error);
    }
);

export default api;
