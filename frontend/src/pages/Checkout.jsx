import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cart/cartSlice.js";
import { createOrder } from "../features/orders/ordersSlice.js";
import { useNavigate, Link } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast.js";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items: cartItems } = useSelector((state) => state.cart);
    const { createStatus, createError, lastCreatedOrder } = useSelector(
        (state) => state.orders
    );

    const [shipping, setShipping] = useState({
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postcode: "",
        country: "Australia",
        phone: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    useEffect(() => {
        // ensure latest cart
        dispatch(fetchCart());
    }, [dispatch]);

    const subtotal = useMemo(
        () =>
            cartItems.reduce(
                (sum, item) => sum + (item.product?.price || 0) * item.qty,
                0
            ),
        [cartItems]
    );

    const shippingPrice = subtotal > 100 ? 0 : 10; // just for frontend display
    const totalPrice = subtotal + shippingPrice;

    useEffect(() => {
        if (createStatus === "succeeded" && lastCreatedOrder?._id) {
            // After creating order, navigate to order details
            navigate(`/orders/${lastCreatedOrder._id}`);
        }
    }, [createStatus, lastCreatedOrder, navigate]);

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="text-center">
                <h3>Your cart is empty</h3>
                <p className="text-muted">
                    You need items in your cart before checkout.
                </p>
                <Link to="/" className="btn btn-primary">
                    Go to products
                </Link>
            </div>
        );
    }

    const handleChange = (e) => {
        setShipping((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            shippingAddress: shipping,
            paymentMethod,
        };

        const resultAction = await dispatch(createOrder(payload));

        if (createOrder.fulfilled.match(resultAction)) {
            showSuccess("Order placed successfully!");
            dispatch(fetchCart());
        } else {
            showError(resultAction.payload || "Failed to place order");
        }
    };

    return (
        <div>
            <h2 className="mb-4">Checkout</h2>
            <div className="row g-4">
                <div className="col-lg-7">
                    <div className="card shadow-sm border-0 rounded-3 mb-4">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-4">Shipping Information</h5>

                            {createError && (
                                <div className="alert alert-danger">
                                    {createError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            name="fullName"
                            className="form-control"
                            value={shipping.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Address Line 1</label>
                        <input
                            name="addressLine1"
                            className="form-control"
                            value={shipping.addressLine1}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Address Line 2</label>
                        <input
                            name="addressLine2"
                            className="form-control"
                            value={shipping.addressLine2}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label className="form-label">City</label>
                            <input
                                name="city"
                                className="form-control"
                                value={shipping.city}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-sm-6 mb-3">
                            <label className="form-label">State</label>
                            <input
                                name="state"
                                className="form-control"
                                value={shipping.state}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 mb-3">
                            <label className="form-label">Postcode</label>
                            <input
                                name="postcode"
                                className="form-control"
                                value={shipping.postcode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-sm-6 mb-3">
                            <label className="form-label">Country</label>
                            <input
                                name="country"
                                className="form-control"
                                value={shipping.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            name="phone"
                            className="form-control"
                            value={shipping.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Payment Method</label>
                        <select
                            className="form-select"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="COD">Cash on Delivery (COD)</option>
                            {/* Future: add Card or other methods */}
                        </select>
                    </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100 mt-3"
                                    disabled={createStatus === "loading"}
                                >
                                    {createStatus === "loading"
                                        ? "Placing order..."
                                        : "Place Order"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5">
                    <div className="card shadow-sm border-0 rounded-3 sticky-top" style={{ top: "20px" }}>
                        <div className="card-body p-4">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="mb-3" style={{ maxHeight: "250px", overflowY: "auto" }}>
                                {cartItems.map((item) => (
                                    <div
                                        key={item.product?._id}
                                        className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom"
                                    >
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={
                                                    item.product?.images?.[0]?.url ||
                                                    "https://via.placeholder.com/50"
                                                }
                                                alt={item.product?.name}
                                                className="rounded me-2"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <div>
                                                <div className="small fw-bold">{item.product?.name}</div>
                                                <div className="text-muted small">Qty: {item.qty}</div>
                                            </div>
                                        </div>
                                        <span className="fw-bold">
                                            ${((item.product?.price || 0) * item.qty).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                                <span>Shipping</span>
                                <span>${shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-0">
                                <span className="fs-5 fw-bold">Total</span>
                                <span className="fs-5 fw-bold text-primary">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
