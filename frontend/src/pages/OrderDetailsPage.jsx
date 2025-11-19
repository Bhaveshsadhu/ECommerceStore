import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchOrderById } from "../features/orders/ordersSlice.js";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orderDetails: order, orderDetailsStatus, orderDetailsError } =
        useSelector((state) => state.orders);

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderById(id));
        }
    }, [dispatch, id]);

    if (orderDetailsStatus === "loading") {
        return (
            <p className="text-center text-muted">Loading order...</p>
        );
    }

    if (orderDetailsStatus === "failed") {
        return (
            <div className="text-center">
                <p className="text-danger mb-3">{orderDetailsError}</p>
                <Link to="/my-orders" className="btn btn-primary">
                    Back to My Orders
                </Link>
            </div>
        );
    }

    if (!order) return null;

    const {
        shippingAddress,
        orderItems,
        paymentMethod,
        paymentStatus,
        orderStatus,
        totalPrice,
        createdAt,
        deliveredAt,
    } = order;

    return (
        <div>
            <h3 className="mb-3">
                Order #{order._id.slice(-6)}
            </h3>

            <div className="row">
                <div className="col-md-7 mb-3">
                    <div className="card shadow-sm border-0 mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Shipping Address</h5>
                            <p className="mb-1">{shippingAddress?.fullName}</p>
                            <p className="mb-1">
                                {shippingAddress?.addressLine1}
                                {shippingAddress?.addressLine2
                                    ? `, ${shippingAddress.addressLine2}`
                                    : ""}
                            </p>
                            <p className="mb-1">
                                {shippingAddress?.city}, {shippingAddress?.state}{" "}
                                {shippingAddress?.postcode}
                            </p>
                            <p className="mb-1">{shippingAddress?.country}</p>
                            <p className="mb-0">
                                Phone: {shippingAddress?.phone}
                            </p>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">Items</h5>
                            <ul className="list-unstyled mb-0">
                                {orderItems?.map((item) => (
                                    <li
                                        key={item._id}
                                        className="d-flex justify-content-between mb-2 small"
                                    >
                                        <div>
                                            <div>{item.name}</div>
                                            <div className="text-muted">
                                                Qty: {item.qty} × ${item.price?.toFixed(2)}
                                            </div>
                                        </div>
                                        <div>
                                            ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-5 mb-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            <p className="mb-1">
                                <strong>Status:</strong> {orderStatus}
                            </p>
                            <p className="mb-1">
                                <strong>Payment:</strong> {paymentMethod} (
                                {paymentStatus})
                            </p>
                            <p className="mb-1">
                                <strong>Created:</strong>{" "}
                                {new Date(createdAt).toLocaleString()}
                            </p>
                            {deliveredAt && (
                                <p className="mb-1">
                                    <strong>Delivered:</strong>{" "}
                                    {new Date(deliveredAt).toLocaleString()}
                                </p>
                            )}
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span>Total</span>
                                <span className="fw-bold">
                                    ${totalPrice?.toFixed(2)}
                                </span>
                            </p>
                            <Link to="/my-orders" className="btn btn-primary w-100">
                                Back to My Orders
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
