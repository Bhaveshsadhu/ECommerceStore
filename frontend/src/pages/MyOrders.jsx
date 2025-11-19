import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../features/orders/ordersSlice.js";
import { Link } from "react-router-dom";

const MyOrders = () => {
    const dispatch = useDispatch();
    const { myOrders, myOrdersStatus, myOrdersError } = useSelector(
        (state) => state.orders
    );

    useEffect(() => {
        dispatch(fetchMyOrders());
    }, [dispatch]);

    if (myOrdersStatus === "loading") {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-3">Loading your orders...</p>
            </div>
        );
    }

    if (myOrdersError) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger d-inline-block">{myOrdersError}</div>
                <div>
                    <Link to="/" className="btn btn-primary">
                        Back to home
                    </Link>
                </div>
            </div>
        );
    }

    if (!myOrders || myOrders.length === 0) {
        return (
            <div className="text-center py-5">
                <h3 className="mb-3">No orders yet</h3>
                <p className="text-muted mb-4">
                    Once you place an order, it will appear here.
                </p>
                <Link to="/" className="btn btn-primary btn-lg">
                    Start Shopping
                </Link>
            </div>
        );
    }

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
            <h2 className="mb-4">My Orders</h2>
            <div className="row g-3">
                {myOrders.map((order) => (
                    <div key={order._id} className="col-12">
                        <div className="card shadow-sm border-0 rounded-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <h6 className="mb-1">Order #{order._id.slice(-8).toUpperCase()}</h6>
                                        <p className="text-muted small mb-0">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <span className={`badge ${getStatusBadgeClass(order.orderStatus)} px-3 py-2`}>
                                            {order.orderStatus}
                                        </span>
                                    </div>
                                    <div className="col-md-2 mb-3 mb-md-0">
                                        <p className="mb-0 small text-muted">Items</p>
                                        <p className="mb-0 fw-bold">{order.orderItems?.length || 0}</p>
                                    </div>
                                    <div className="col-md-2 mb-3 mb-md-0">
                                        <p className="mb-0 small text-muted">Total</p>
                                        <p className="mb-0 fw-bold text-primary">
                                            ${order.totalPrice?.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="col-md-2 text-md-end">
                                        <Link
                                            to={`/orders/${order._id}`}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
