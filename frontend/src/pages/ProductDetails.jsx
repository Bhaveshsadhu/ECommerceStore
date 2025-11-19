import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { fetchProductById } from "../features/products/productsSlice.js";
import { addToCart } from "../features/cart/cartSlice.js";
import useAuth from "../hooks/useAuth.js";
import { showSuccess, showError } from "../utils/toast.js";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [qty, setQty] = useState(1);

    const {
        productDetails: product,
        detailsStatus,
        detailsError,
    } = useSelector((state) => state.products);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    const handleAddToCart = async () => {
        if (!user) {
            navigate("/login", { state: { from: location } });
            return;
        }
        if (product?._id) {
            try {
                const result = await dispatch(addToCart({ productId: product._id, qty }));
                if (addToCart.fulfilled.match(result)) {
                    showSuccess(`Added ${qty} ${product.name} to cart!`);
                } else {
                    showError(result.payload || "Failed to add to cart");
                }
            } catch (error) {
                showError("Failed to add to cart");
            }
        }
    };

    if (detailsStatus === "loading") {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-3">Loading product...</p>
            </div>
        );
    }

    if (detailsStatus === "failed") {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger d-inline-block">
                    {detailsError}
                </div>
                <div>
                    <Link to="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    const thumbnail =
        product.images && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/500x300?text=No+Image";

    return (
        <div className="row g-4">
            <div className="col-lg-6 col-md-6">
                <div className="card shadow-sm border-0 rounded-3">
                    <img
                        src={thumbnail}
                        className="card-img-top rounded-3"
                        alt={product.name}
                        style={{ objectFit: "cover", height: "400px" }}
                    />
                </div>
            </div>

            <div className="col-lg-6 col-md-6">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {product.name}
                        </li>
                    </ol>
                </nav>

                <h2 className="mb-3">{product.name}</h2>

                <div className="mb-3">
                    <span className="badge bg-secondary me-2">
                        {product.category?.name || "Uncategorized"}
                    </span>
                    {product.stock > 0 ? (
                        <span className="badge bg-success">In Stock</span>
                    ) : (
                        <span className="badge bg-danger">Out of Stock</span>
                    )}
                </div>

                <h3 className="text-primary mb-3">${product.price?.toFixed(2)}</h3>

                <p className="text-muted mb-3">
                    <strong>Vendor:</strong> {product.vendor?.name || "N/A"}
                </p>

                <p className="mb-4">{product.description}</p>

                <div className="mb-4">
                    <p className="text-muted mb-2">
                        <strong>Availability:</strong> {product.stock} in stock
                    </p>
                </div>

                {product.stock > 0 && (
                    <div className="mb-4">
                        <label htmlFor="quantity" className="form-label">
                            Quantity:
                        </label>
                        <div className="input-group" style={{ maxWidth: "150px" }}>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setQty(Math.max(1, qty - 1))}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                className="form-control text-center"
                                id="quantity"
                                value={qty}
                                onChange={(e) =>
                                    setQty(
                                        Math.max(
                                            1,
                                            Math.min(product.stock, parseInt(e.target.value) || 1)
                                        )
                                    )
                                }
                                min="1"
                                max={product.stock}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                    >
                        Add to Cart
                    </button>
                    <Link to="/" className="btn btn-outline-secondary btn-lg">
                        Back to Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
