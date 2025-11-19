import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cartSlice.js";
import useAuth from "../../../hooks/useAuth.js";
import { showSuccess, showError } from "../../../utils/toast.js";

const ProductCard = ({ product }) => {
    const thumbnail =
        product.images && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/300x200?text=No+Image";

    const dispatch = useDispatch();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = async () => {
        if (!user) {
            navigate("/login", { state: { from: location } });
            return;
        }
        try {
            const result = await dispatch(addToCart({ productId: product._id, qty: 1 }));
            if (addToCart.fulfilled.match(result)) {
                showSuccess(`${product.name} added to cart!`);
            } else {
                showError(result.payload || "Failed to add to cart");
            }
        } catch (error) {
            showError("Failed to add to cart");
        }
    };

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm border-0 rounded-3 hover-shadow">
                <Link to={`/products/${product._id}`} className="text-decoration-none">
                    <img
                        src={thumbnail}
                        className="card-img-top rounded-top-3"
                        alt={product.name}
                        style={{ objectFit: "cover", height: "200px" }}
                    />
                </Link>
                <div className="card-body d-flex flex-column">
                    <Link
                        to={`/products/${product._id}`}
                        className="text-decoration-none text-dark"
                    >
                        <h6 className="card-title mb-2" title={product.name}>
                            {product.name}
                        </h6>
                    </Link>
                    <p className="text-primary fw-bold mb-2 fs-5">
                        ${product.price?.toFixed(2)}
                    </p>
                    <p className="card-text text-muted small flex-grow-1 mb-3">
                        {product.description?.slice(0, 70)}
                        {product.description && product.description.length > 70 ? "..." : ""}
                    </p>
                    <div className="d-grid gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
