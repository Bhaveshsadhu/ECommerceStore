import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorOrders } from "../features/vendor/vendorSlice.js";
import VendorLayout from "../layouts/VendorLayout.jsx";
import { Link } from "react-router-dom";

const VendorOrders = () => {
    const dispatch = useDispatch();
    const { orders, ordersStatus, ordersError } = useSelector(
        (state) => state.vendor
    );

    useEffect(() => {
        dispatch(fetchVendorOrders());
    }, [dispatch]);

    return (
        <VendorLayout>
            <h3 className="mb-3">Orders for My Products</h3>

            {ordersStatus === "loading" && (
                <p className="text-muted">Loading orders...</p>
            )}

            {ordersError && (
                <p className="text-danger">Error: {ordersError}</p>
            )}

            {orders && orders.length === 0 && (
                <p className="text-muted">
                    No orders yet for your products.
                </p>
            )}

            {orders && orders.length > 0 && (
                <div className="list-group">
                    {orders.map((order) => (
                        <Link
                            key={order._id}
                            to={`/vendor/orders/${order._id}`}
                            className="list-group-item list-group-item-action"
                        >
                            <div className="d-flex justify-content-between mb-1">
                                <span className="fw-bold">
                                    Order #{order._id.slice(-6)}
                                </span>
                                <span className="badge bg-secondary">
                                    {order.orderStatus}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between small text-muted">
                                <span>
                                    Items for you:{" "}
                                    {order.vendorItemsCount ?? order.orderItems?.length ?? 0}
                                </span>
                                <span>
                                    {new Date(order.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </VendorLayout>
    );
};

export default VendorOrders;
