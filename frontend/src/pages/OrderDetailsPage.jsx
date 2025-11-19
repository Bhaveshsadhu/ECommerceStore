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
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-3">Loading order...</p>
            </div>
        );
    }

    if (orderDetailsStatus === "failed") {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger d-inline-block">{orderDetailsError}</div>
                <div>
                    <Link to="/my-orders" className="btn btn-primary">
                        Back to My Orders
                    </Link>
                </div>
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
        itemsPrice,
        shippingPrice,
        createdAt,
        deliveredAt,
    } = order;

    const getStatusBadgeClass = (status) => {
        const statusMap = {
            Pending: "bg-warning",
            Processing: "bg-info",
            Shipped: "bg-primary",
            "Out for Delivery": "bg-primary",
            Delivered: "bg-success",
            Cancelled: "bg-danger",
        };
        return statusMap[status] || "bg-secondary";
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Order #{order._id.slice(-8).toUpperCase()}</h2>
                <Link to="/my-orders" className="btn btn-outline-secondary">
                    Back to Orders
                </Link>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-3 mb-4">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-3">Order Items</h5>
                            {orderItems?.map((item) => (
                                <div
                                    key={item._id}
                                    className="d-flex align-items-center mb-3 pb-3 border-bottom"
                                >
                                    <img
                                        src={item.image || "https://via.placeholder.com/80"}
                                        alt={item.name}
                                        className="rounded me-3"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{item.name}</h6>
                                        <p className="text-muted small mb-0">
                                            Qty: {item.qty} × ${item.price?.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-end">
                                        <div className="fw-bold">
                                            ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card shadow-sm border-0 rounded-3">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-3">Shipping Address</h5>
                            <p className="mb-1 fw-bold">{shippingAddress?.fullName}</p>
                            <p className="mb-1">{shippingAddress?.addressLine1}</p>
                            {shippingAddress?.addressLine2 && (
                                <p className="mb-1">{shippingAddress.addressLine2}</p>
                            )}
                            <p className="mb-1">
                                {shippingAddress?.city}, {shippingAddress?.state}{" "}
                                {shippingAddress?.postcode}
                            </p>
                            <p className="mb-1">{shippingAddress?.country}</p>
                            <p className="mb-0">
                                <strong>Phone:</strong> {shippingAddress?.phone}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 rounded-3 mb-3">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-3">Order Summary</h5>

                            <div className="mb-3">
                                <span className={`badge ${getStatusBadgeClass(orderStatus)} px-3 py-2`}>
                                    {orderStatus}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Items Price</span>
                                <span>${itemsPrice?.toFixed(2) || "0.00"}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                                <span>Shipping</span>
                                <span>${shippingPrice?.toFixed(2) || "0.00"}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fs-5 fw-bold">Total</span>
                                <span className="fs-5 fw-bold text-primary">
                                    ${totalPrice?.toFixed(2)}
                                </span>
                            </div>

                            <div className="mb-3 pb-3 border-bottom">
                                <p className="mb-1">
                                    <strong>Payment Method:</strong> {paymentMethod}
                                </p>
                                <p className="mb-0">
                                    <strong>Payment Status:</strong>{" "}
                                    <span
                                        className={`badge ${
                                            paymentStatus === "Paid" ? "bg-success" : "bg-warning"
                                        }`}
                                    >
                                        {paymentStatus}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p className="mb-1 small text-muted">
                                    <strong>Order Date:</strong><br />
                                    {new Date(createdAt).toLocaleString()}
                                </p>
                                {deliveredAt && (
                                    <p className="mb-0 small text-muted">
                                        <strong>Delivered Date:</strong><br />
                                        {new Date(deliveredAt).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
