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
            <p className="text-center text-muted">Loading your orders...</p>
        );
    }

    if (myOrdersError) {
        return (
            <div className="text-center">
                <p className="text-danger mb-3">{myOrdersError}</p>
                <Link to="/" className="btn btn-primary">
                    Back to home
                </Link>
            </div>
        );
    }

    if (!myOrders || myOrders.length === 0) {
        return (
            <div className="text-center">
                <h3>No orders yet</h3>
                <p className="text-muted">
                    Once you place an order, it will appear here.
                </p>
                <Link to="/" className="btn btn-primary">
                    Start shopping
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h3 className="mb-3">My Orders</h3>
            <div className="list-group">
                {myOrders.map((order) => (
                    <Link
                        key={order._id}
                        to={`/orders/${order._id}`}
                        className="list-group-item list-group-item-action"
                    >
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="fw-bold">
                                Order #{order._id.slice(-6)}
                            </span>
                            <span className="badge bg-secondary">
                                {order.orderStatus}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between small text-muted">
                            <span>
                                {order.orderItems?.length || 0} items •{" "}
                                {new Date(order.createdAt).toLocaleString()}
                            </span>
                            <span>${order.totalPrice?.toFixed(2)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
