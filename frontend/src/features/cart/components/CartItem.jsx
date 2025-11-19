const CartItem = ({ item, onQtyChange, onRemove }) => {
    const product = item.product || {};
    const thumbnail =
        product.images && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/80x80?text=No+Image";

    const handleChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            onQtyChange(product._id, value);
        }
    };

    return (
        <div className="d-flex align-items-center mb-3 border rounded p-2 bg-white">
            <img
                src={thumbnail}
                alt={product.name}
                style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                }}
                className="me-3"
            />
            <div className="flex-grow-1">
                <h6 className="mb-1">{product.name}</h6>
                <p className="mb-1 text-muted small">
                    ${product.price?.toFixed(2)} each
                </p>
                <div className="d-flex align-items-center gap-2">
                    <input
                        type="number"
                        min="0"
                        className="form-control form-control-sm"
                        style={{ width: "80px" }}
                        value={item.qty}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onRemove(product._id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="text-end ms-3">
                <div className="fw-bold">
                    ${(product.price * item.qty).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
