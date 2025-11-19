import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAssignedOrders,
    updateDeliveryOrderStatus,
} from "../features/delivery/deliverySlice.js";
import DeliveryLayout from "../layouts/DeliveryLayout.jsx";

const DeliveryOrders = () => {
    const dispatch = useDispatch();
    const {
        assignedOrders,
        ordersStatus,
        ordersError,
        updateStatus,
        updateError,
    } = useSelector((state) => state.delivery);

    useEffect(() => {
        dispatch(fetchAssignedOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId, status) => {
        dispatch(updateDeliveryOrderStatus({ id: orderId, status }));
    };

    return (
        <DeliveryLayout>
            <h3 className="mb-3">Assigned Orders</h3>

            {ordersStatus === "loading" && (
                <p className="text-muted">Loading assigned orders...</p>
            )}

            {ordersError && (
                <p className="text-danger">Error: {ordersError}</p>
            )}

            {updateError && (
                <div className="alert alert-danger py-2">
                    {updateError}
                </div>
            )}

            {assignedOrders && assignedOrders.length === 0 && (
                <p className="text-muted">No assigned orders at the moment.</p>
            )}

            {assignedOrders && assignedOrders.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm align-middle">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-6)}</td>
                                    <td>{order.user?.name}</td>
                                    <td>
                                        {order.shippingAddress?.addressLine1},{" "}
                                        {order.shippingAddress?.city}{" "}
                                        {order.shippingAddress?.postcode}
                                    </td>
                                    <td>{order.shippingAddress?.phone}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                disabled={
                                                    updateStatus === "loading" ||
                                                    order.orderStatus === "Out for Delivery" ||
                                                    order.orderStatus === "Delivered"
                                                }
                                                onClick={() =>
                                                    handleStatusChange(order._id, "Out for Delivery")
                                                }
                                            >
                                                Out for Delivery
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-success"
                                                disabled={
                                                    updateStatus === "loading" ||
                                                    order.orderStatus === "Delivered"
                                                }
                                                onClick={() =>
                                                    handleStatusChange(order._id, "Delivered")
                                                }
                                            >
                                                Delivered
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </DeliveryLayout>
    );
};

export default DeliveryOrders;
