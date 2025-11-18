import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const price = Number(product.price) || 0;
  const rating = product.rating ?? 4.7;

  return (
    <article className="product-card h-100 p-3 d-flex flex-column">
      <Link to={`/products/${product._id}`} className="product-image overflow-hidden mb-3 d-block">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-100 h-100 object-fit-cover"
            style={{ borderRadius: "inherit" }}
          />
        ) : (
          <span>Premium imagery coming soon</span>
        )}
      </Link>
      <div className="mb-2 text-muted small d-flex align-items-center gap-1">
        <span>⭐ {rating}</span>
        <span>·</span>
        <span>{product.category || "Lifestyle"}</span>
      </div>
      <Link to={`/products/${product._id}`} className="fw-semibold text-decoration-none text-reset">
        {product.name}
      </Link>
      <p className="text-muted small mb-3">{product.shortDescription || "A bestseller loved by our community."}</p>

      <div className="mt-auto d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-bold fs-5">${price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-muted text-decoration-line-through ms-2">
              ${Number(product.originalPrice).toFixed(2)}
            </span>
          )}
        </div>
        <button
          className="btn btn-primary btn-sm px-3"
          type="button"
          onClick={() => addToCart(product, 1)}
        >
          Add
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
