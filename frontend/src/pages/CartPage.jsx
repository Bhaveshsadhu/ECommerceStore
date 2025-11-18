import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const shipping = subtotal > 100 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="surface-card p-5 text-center">
        <h1 className="h4 mb-2">Your cart is empty</h1>
        <p className="text-muted mb-4">Browse our catalog and add products you love.</p>
        <Link to="/products" className="btn btn-primary">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-8">
        <div className="surface-card p-4">
          <div className="section-heading mb-4">
            <h2>Shopping cart</h2>
            <span className="text-muted">{items.length} items</span>
          </div>

          {items.map((item) => (
            <div key={item._id} className="cart-item-card d-flex gap-3 flex-column flex-md-row">
              <div className="product-image flex-shrink-0" style={{ width: "120px", height: "120px" }}>
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-100 h-100 object-fit-cover rounded" />
                ) : (
                  <span>{item.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-0">SKU: {item._id}</p>
                  </div>
                  <button className="btn btn-link text-danger p-0" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </button>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
                  <div>
                    <label className="form-label small text-muted mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item._id, event.target.value)}
                      className="form-control form-control-sm"
                      style={{ width: "90px" }}
                    />
                  </div>
                  <div className="ms-auto text-end">
                    <p className="mb-0 text-muted small">Unit price</p>
                    <p className="h5 mb-0">${(item.price || 0).toFixed(2)}</p>
                    <p className="text-muted small">
                      Subtotal ${(item.price * item.quantity || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="surface-card p-4">
          <h3 className="h5 mb-4">Order summary</h3>

          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <span className="fw-semibold">Total</span>
            <span className="fw-bold fs-4">${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="btn btn-primary w-100 mt-4">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
