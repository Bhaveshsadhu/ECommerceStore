import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice.js";
import ProductList from "../features/products/components/ProductList.jsx";

const Home = () => {
  // Home page
    const dispatch = useDispatch();
    const { items, status, error, total } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, limit: 12 }));
    }, [dispatch]);

    return (
        <div>
            <div className="mb-5 text-center py-4">
                <h1 className="display-4 fw-bold mb-3">Welcome to E-Commerce</h1>
                <p className="lead text-muted mb-0">
                    Discover amazing products from trusted vendors
                </p>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Featured Products</h3>
                {status === "succeeded" && total > 0 && (
                    <span className="badge bg-primary rounded-pill px-3 py-2">
                        {total} products
                    </span>
                )}
            </div>

            {status === "loading" && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-3">Loading products...</p>
                </div>
            )}

            {status === "failed" && (
                <div className="alert alert-danger text-center" role="alert">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {status === "succeeded" && items.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted">No products available at the moment.</p>
                </div>
            )}

            {status === "succeeded" && items.length > 0 && <ProductList products={items} />}
        </div>
    );
};

export default Home;
