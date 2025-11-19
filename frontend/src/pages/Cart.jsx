import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from "../features/cart/cartSlice.js";
import CartItem from "../features/cart/components/CartItem.jsx";
import { Link, useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast.js";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, status, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const subtotal = useMemo(
        () =>
            items.reduce(
                (sum, item) => sum + (item.product?.price || 0) * item.qty,
                0
            ),
        [items]
    );

    const itemCount = useMemo(
        () => items.reduce((sum, item) => sum + item.qty, 0),
        [items]
    );

    const handleQtyChange = async (productId, qty) => {
        try {
            const result = await dispatch(updateCartItem({ productId, qty }));
            if (updateCartItem.fulfilled.match(result)) {
                showSuccess("Cart updated");
            } else {
                showError(result.payload || "Failed to update cart");
            }
        } catch (error) {
            showError("Failed to update cart");
        }
    };

    const handleRemove = async (productId) => {
        try {
            const result = await dispatch(removeCartItem(productId));
            if (removeCartItem.fulfilled.match(result)) {
                showSuccess("Item removed from cart");
            } else {
                showError(result.payload || "Failed to remove item");
            }
        } catch (error) {
            showError("Failed to remove item");
        }
    };

    const handleClear = async () => {
        if (window.confirm("Are you sure you want to clear your cart?")) {
            try {
                const result = await dispatch(clearCart());
                if (clearCart.fulfilled.match(result)) {
                    showSuccess("Cart cleared");
                } else {
                    showError(result.payload || "Failed to clear cart");
                }
            } catch (error) {
                showError("Failed to clear cart");
            }
        }
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    if (status === "loading") {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-3">Loading your cart...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger d-inline-block">{error}</div>
                <div>
                    <Link to="/" className="btn btn-primary">
                        Back to home
                    </Link>
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-4">
                    <i className="bi bi-cart-x" style={{ fontSize: "4rem", color: "#ccc" }}></i>
                </div>
                <h3 className="mb-3">Your cart is empty</h3>
                <p className="text-muted mb-4">
                    Browse our products and add something to your cart.
                </p>
                <Link to="/" className="btn btn-primary btn-lg">
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">{itemCount} item{itemCount !== 1 ? "s" : ""} in cart</h5>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleClear}
                        >
                            Clear Cart
                        </button>
                    </div>
                    {items.map((item) => (
                        <CartItem
                            key={item.product?._id}
                            item={item}
                            onQtyChange={handleQtyChange}
                            onRemove={handleRemove}
                        />
                    ))}
                    <div className="mt-3">
                        <Link to="/" className="btn btn-outline-secondary">
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 rounded-3 sticky-top" style={{ top: "20px" }}>
                        <div className="card-body p-4">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal ({itemCount} items)</span>
                                <span className="fw-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                                <span className="text-muted">Shipping</span>
                                <span className="text-muted">Calculated at checkout</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fs-5 fw-bold">Total</span>
                                <span className="fs-5 fw-bold text-primary">${subtotal.toFixed(2)}</span>
                            </div>
                            <button
                                className="btn btn-primary btn-lg w-100 mb-2"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                            <p className="text-muted small text-center mb-0">
                                Tax and shipping calculated at checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
