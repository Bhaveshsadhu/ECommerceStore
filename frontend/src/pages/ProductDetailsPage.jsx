import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProductById(id);
        if (isMounted) {
          setProduct(data || null);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Unable to load product.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) return product.images;
    if (product.image) return [product.image];
    return [];
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="surface-card p-5 text-center">
        <div className="spinner-border text-primary mb-3" role="status" />
        <p className="mb-0">Loading product details…</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger surface-card border-0">{error}</div>;
  }

  if (!product) {
    return <div className="alert alert-warning surface-card border-0">Product not found.</div>;
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <div className="surface-card p-4 h-100">
          <div className="product-image mb-3" style={{ height: "420px" }}>
            {galleryImages.length > 0 ? (
              <img
                src={galleryImages[0]}
                alt={product.name}
                className="w-100 h-100 object-fit-cover rounded"
              />
            ) : (
              <span>Imagery coming soon</span>
            )}
          </div>
          <div className="d-flex gap-3">
            {galleryImages.map((image, index) => (
              <div className="product-image" style={{ height: "90px" }} key={`${image}-${index}`}>
                <img src={image} alt={product.name} className="w-100 h-100 object-fit-cover rounded" />
              </div>
            ))}
            {galleryImages.length === 0 && (
              <>
                <div className="product-image" style={{ height: "90px" }} />
                <div className="product-image" style={{ height: "90px" }} />
                <div className="product-image" style={{ height: "90px" }} />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="surface-card p-4 h-100">
          <p className="text-uppercase small text-muted mb-1">{product.category || "Featured"}</p>
          <h1 className="h3 mb-2">{product.name}</h1>
          <p className="text-muted mb-3">
            {product.description || "Crafted with premium materials and designed for modern living."}
          </p>

          <div className="d-flex align-items-baseline gap-3 mb-4">
            <span className="display-6 fw-bold text-primary">${Number(product.price || 0).toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6">
              <div className="surface-card p-3 text-center">
                <p className="h4 mb-0">{product.rating || "4.8"}</p>
                <small className="text-muted">Average rating</small>
              </div>
            </div>
            <div className="col-6">
              <div className="surface-card p-3 text-center">
                <p className="h4 mb-0">{product.stock || "In Stock"}</p>
                <small className="text-muted">Availability</small>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-muted text-uppercase small">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(Math.max(Number(event.target.value) || 1, 1))}
              className="form-control w-auto"
            />
          </div>

          <div className="d-flex flex-wrap gap-3 mb-4">
            <button className="btn btn-primary flex-grow-1" type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-outline-secondary flex-grow-1" type="button">
              Buy Now
            </button>
          </div>

          <ul className="text-muted small list-unstyled mb-0">
            <li>✔ Free worldwide shipping on orders over $100</li>
            <li>✔ 30-day no-questions return policy</li>
            <li>✔ Secure payment powered by UrbanCart Pay</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
