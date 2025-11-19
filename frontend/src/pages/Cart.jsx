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

    const handleQtyChange = (productId, qty) => {
        dispatch(updateCartItem({ productId, qty }));
    };

    const handleRemove = (productId) => {
        dispatch(removeCartItem(productId));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    if (status === "loading") {
        return (
            <p className="text-center text-muted">Loading your cart...</p>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <p className="text-danger mb-3">{error}</p>
                <Link to="/" className="btn btn-primary">
                    Back to home
                </Link>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="text-center">
                <h3>Your cart is empty</h3>
                <p className="text-muted">
                    Browse products and add something to your cart.
                </p>
                <Link to="/" className="btn btn-primary">
                    Go to products
                </Link>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-lg-8 mb-3">
                <h3 className="mb-3">Your Cart</h3>
                {items.map((item) => (
                    <CartItem
                        key={item.product?._id}
                        item={item}
                        onQtyChange={handleQtyChange}
                        onRemove={handleRemove}
                    />
                ))}
                <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={handleClear}
                >
                    Clear cart
                </button>
            </div>

            <div className="col-lg-4">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="card-title">Summary</h5>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {/* shipping & total will be calculated on backend in orders */}
                        <button
                            className="btn btn-primary w-100 mt-3"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
