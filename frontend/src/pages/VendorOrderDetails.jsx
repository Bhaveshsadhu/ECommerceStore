import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchVendorOrderById } from "../features/vendor/vendorSlice.js";
import VendorLayout from "../layouts/VendorLayout.jsx";

const VendorOrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {
        orderDetails: order,
        orderDetailsStatus,
        orderDetailsError,
    } = useSelector((state) => state.vendor);

    useEffect(() => {
        if (id) {
            dispatch(fetchVendorOrderById(id));
        }
    }, [dispatch, id]);

    return (
        <VendorLayout>
            {orderDetailsStatus === "loading" && (
                <p className="text-muted">Loading order...</p>
            )}

            {orderDetailsError && (
                <div className="text-danger mb-3">{orderDetailsError}</div>
            )}

            {!order && orderDetailsStatus === "succeeded" && (
                <p className="text-muted">Order not found.</p>
            )}

            {order && (
                <>
                    <h3 className="mb-3">
                        Order #{order._id.slice(-6)}
                    </h3>

                    <p className="mb-1">
                        <strong>Status:</strong> {order.orderStatus}
                    </p>
                    <p className="mb-1">
                        <strong>Customer:</strong> {order.user?.name} (
                        {order.user?.email})
                    </p>
                    <p className="mb-3">
                        <strong>Created:</strong>{" "}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h5 className="card-title">Items for You</h5>
                            <ul className="list-unstyled mb-0">
                                {order.orderItems?.map((item) => (
                                    <li
                                        key={item._id}
                                        className="d-flex justify-content-between small mb-2"
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

                    <Link
                        to="/vendor/orders"
                        className="btn btn-outline-secondary btn-sm mt-3"
                    >
                        Back to Orders
                    </Link>
                </>
            )}
        </VendorLayout>
    );
};

export default VendorOrderDetails;
