import { Link } from "react-router-dom";

const CartItem = ({ item, onQtyChange, onRemove }) => {
    const product = item.product || {};
    const thumbnail =
        product.images && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/100x100?text=No+Image";

    const handleQtyChange = (newQty) => {
        if (newQty > 0 && newQty <= (product.stock || 999)) {
            onQtyChange(product._id, newQty);
        }
    };

    return (
        <div className="card mb-3 shadow-sm border-0">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-md-2 col-3 mb-3 mb-md-0">
                        <Link to={`/products/${product._id}`}>
                            <img
                                src={thumbnail}
                                alt={product.name}
                                className="img-fluid rounded"
                                style={{ objectFit: "cover", height: "100px", width: "100%" }}
                            />
                        </Link>
                    </div>
                    <div className="col-md-4 col-9 mb-3 mb-md-0">
                        <Link
                            to={`/products/${product._id}`}
                            className="text-decoration-none text-dark"
                        >
                            <h6 className="mb-1">{product.name}</h6>
                        </Link>
                        <p className="text-muted small mb-0">
                            ${product.price?.toFixed(2)} each
                        </p>
                        {product.stock && product.stock < 10 && (
                            <small className="text-warning">
                                Only {product.stock} left in stock
                            </small>
                        )}
                    </div>
                    <div className="col-md-3 col-6 mb-3 mb-md-0">
                        <label className="form-label small mb-1">Quantity:</label>
                        <div className="input-group input-group-sm" style={{ maxWidth: "130px" }}>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => handleQtyChange(item.qty - 1)}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                max={product.stock || 999}
                                className="form-control text-center"
                                value={item.qty}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 1;
                                    handleQtyChange(val);
                                }}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => handleQtyChange(item.qty + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="col-md-2 col-4 text-end mb-3 mb-md-0">
                        <div className="fw-bold fs-5">
                            ${((product.price || 0) * item.qty).toFixed(2)}
                        </div>
                    </div>
                    <div className="col-md-1 col-2 text-end">
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onRemove(product._id)}
                            title="Remove from cart"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
