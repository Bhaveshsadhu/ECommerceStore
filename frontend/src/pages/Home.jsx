import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios.js";
import { fetchProducts } from "../features/products/productsSlice.js";
import ProductList from "../features/products/components/ProductList.jsx";

const Home = () => {
    const dispatch = useDispatch();
    const { items, status, error, total } = useSelector(
        (state) => state.products
    );

    const [apiStatus, setApiStatus] = useState({
        loading: true,
        ok: false,
        message: "",
    });

    // Check backend health once
    useEffect(() => {
        const checkHealth = async () => {
            try {
                const { data } = await api.get("/health");
                setApiStatus({
                    loading: false,
                    ok: true,
                    message: data?.message || "API is running",
                });
            } catch (error) {
                setApiStatus({
                    loading: false,
                    ok: false,
                    message: error?.response?.data?.message || "Cannot reach API",
                });
            }
        };

        checkHealth();
    }, []);

    // Fetch products from DB
    useEffect(() => {
        dispatch(fetchProducts({ page: 1, limit: 12 }));
    }, [dispatch]);

    return (
        <div>
            <div className="mb-4 text-center">
                <h1 className="display-5 fw-bold">Welcome to E-Commerce</h1>
                <p className="text-muted">
                    Browse live products directly from MongoDB using your MERN backend.
                </p>
            </div>

            {/* Backend health card */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <div
                        className={`card shadow-sm border-0 ${apiStatus.ok ? "border-success" : "border-danger"
                            }`}
                    >
                        <div className="card-body text-center">
                            <h5 className="card-title">Backend API Status</h5>
                            {apiStatus.loading ? (
                                <p className="text-muted mb-0">
                                    Checking backend health...
                                </p>
                            ) : apiStatus.ok ? (
                                <p className="text-success mb-0">
                                    ✅ Connected: {apiStatus.message}
                                </p>
                            ) : (
                                <p className="text-danger mb-0">
                                    Backend not reachable: {apiStatus.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Products section */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Products</h4>
                <span className="text-muted small">
                    {status === "succeeded" ? `${total} products` : ""}
                </span>
            </div>

            {status === "loading" && (
                <p className="text-center text-muted">Loading products...</p>
            )}

            {status === "failed" && (
                <p className="text-center text-danger">{error}</p>
            )}

            {status === "succeeded" && <ProductList products={items} />}
        </div>
    );
};

export default Home;
