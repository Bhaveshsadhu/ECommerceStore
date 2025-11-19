import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cart/cartSlice.js";
import { createOrder } from "../features/orders/ordersSlice.js";
import { useNavigate, Link } from "react-router-dom";

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

        // backend clears cart; you can also refetch cart here
        if (createOrder.fulfilled.match(resultAction)) {
            dispatch(fetchCart());
        }
    };

    return (
        <div className="row">
            <div className="col-lg-7 mb-4">
                <h3 className="mb-3">Checkout</h3>

                {createError && (
                    <div className="alert alert-danger py-2">
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
                        className="btn btn-primary w-100 mt-2"
                        disabled={createStatus === "loading"}
                    >
                        {createStatus === "loading"
                            ? "Placing order..."
                            : "Place Order"}
                    </button>
                </form>
            </div>

            <div className="col-lg-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="card-title">Order Summary</h5>
                        <ul className="list-unstyled mb-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
                            {cartItems.map((item) => (
                                <li
                                    key={item.product?._id}
                                    className="d-flex justify-content-between small mb-1"
                                >
                                    <span>
                                        {item.product?.name} x {item.qty}
                                    </span>
                                    <span>
                                        $
                                        {(
                                            (item.product?.price || 0) * item.qty
                                        ).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Shipping</span>
                            <span>${shippingPrice.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
