import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cartSlice.js";
import useAuth from "../../../hooks/useAuth.js";

const ProductCard = ({ product }) => {
    const thumbnail =
        product.images && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/300x200?text=No+Image";

    const dispatch = useDispatch();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAddToCart = () => {
        if (!user) {
            navigate("/login", { state: { from: location } });
            return;
        }
        dispatch(addToCart({ productId: product._id, qty: 1 }));
    };

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
                <img
                    src={thumbnail}
                    className="card-img-top"
                    alt={product.name}
                    style={{ objectFit: "cover", height: "180px" }}
                />
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-truncate" title={product.name}>
                        {product.name}
                    </h6>
                    <p className="card-text fw-bold mb-2">
                        ${product.price?.toFixed(2)}
                    </p>
                    <p className="card-text text-muted small flex-grow-1">
                        {product.description?.slice(0, 60)}
                        {product.description && product.description.length > 60
                            ? "..."
                            : ""}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <Link
                            to={`/products/${product._id}`}
                            className="btn btn-sm btn-outline-primary"
                        >
                            View
                        </Link>
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
