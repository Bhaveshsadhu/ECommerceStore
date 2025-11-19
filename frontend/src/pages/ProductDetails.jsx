import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../features/products/productsSlice.js";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
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

    if (detailsStatus === "loading") {
        return (
            <p className="text-center text-muted">Loading product...</p>
        );
    }

    if (detailsStatus === "failed") {
        return (
            <div className="text-center">
                <p className="text-danger mb-3">{detailsError}</p>
                <Link to="/" className="btn btn-primary">
                    Back to Home
                </Link>
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
        <div className="row">
            <div className="col-md-5 mb-3">
                <div className="card shadow-sm border-0">
                    <img
                        src={thumbnail}
                        className="card-img-top"
                        alt={product.name}
                        style={{ objectFit: "cover", height: "280px" }}
                    />
                </div>
            </div>

            <div className="col-md-7">
                <h2>{product.name}</h2>
                <p className="text-muted">
                    Vendor: {product.vendor?.name || "N/A"}
                </p>
                <h4 className="text-primary mb-3">
                    ${product.price?.toFixed(2)}
                </h4>

                <p>{product.description}</p>

                <p className="text-muted small">
                    Stock: {product.stock} available
                </p>

                <div className="d-flex gap-2 mt-3">
                    {/* Add to cart will be implemented in Cart step */}
                    <button className="btn btn-primary" disabled>
                        Add to Cart (coming soon)
                    </button>
                    <Link to="/" className="btn btn-outline-secondary">
                        Back to products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
