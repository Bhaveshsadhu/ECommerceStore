import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAdminOrders,
    fetchAdminDeliveryPartners,
    assignDeliveryPartner,
    updateAdminOrderStatus,
} from "../features/admin/adminSlice.js";
import AdminLayout from "../layouts/AdminLayout.jsx";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const {
        orders,
        ordersStatus,
        ordersError,
        deliveryPartners,
        deliveryPartnersStatus,
        actionStatus,
        actionError,
    } = useSelector((state) => state.admin);

    const [selectedDeliveryPartner, setSelectedDeliveryPartner] =
        useState({}); // {orderId: deliveryPartnerId}

    useEffect(() => {
        dispatch(fetchAdminOrders());
        dispatch(fetchAdminDeliveryPartners());
    }, [dispatch]);

    const handleAssign = (orderId) => {
        const deliveryPartnerId = selectedDeliveryPartner[orderId];
        if (!deliveryPartnerId) return;
        dispatch(assignDeliveryPartner({ orderId, deliveryPartnerId }));
    };

    const handleStatusChange = (orderId, status) => {
        dispatch(updateAdminOrderStatus({ orderId, status }));
    };

    return (
        <AdminLayout>
            <h3 className="mb-3">Orders</h3>

            {(ordersStatus === "loading" ||
                deliveryPartnersStatus === "loading") && (
                    <p className="text-muted">Loading orders...</p>
                )}

            {ordersError && <p className="text-danger">{ordersError}</p>}
            {actionError && (
                <div className="alert alert-danger py-2">{actionError}</div>
            )}

            {orders && orders.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm align-middle">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Delivery Partner</th>
                                <th>Assign</th>
                                <th>Change Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o._id}>
                                    <td>#{o._id.slice(-6)}</td>
                                    <td>{o.user?.name}</td>
                                    <td>{o.orderStatus}</td>
                                    <td>${o.totalPrice?.toFixed(2)}</td>
                                    <td>
                                        {o.deliveryPartner
                                            ? `${o.deliveryPartner.name} (${o.deliveryPartner.email})`
                                            : "None"}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <select
                                                className="form-select form-select-sm"
                                                value={
                                                    selectedDeliveryPartner[o._id] ||
                                                    o.deliveryPartner?._id ||
                                                    ""
                                                }
                                                disabled={deliveryPartnersStatus === "loading"}
                                                onChange={(e) =>
                                                    setSelectedDeliveryPartner((prev) => ({
                                                        ...prev,
                                                        [o._id]: e.target.value,
                                                    }))
                                                }
                                            >
                                                <option value="">Select</option>
                                                {deliveryPartners.map((dp) => (
                                                    <option key={dp._id} value={dp._id}>
                                                        {dp.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                disabled={actionStatus === "loading"}
                                                onClick={() => handleAssign(o._id)}
                                            >
                                                Assign
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                className="btn btn-outline-secondary"
                                                disabled={actionStatus === "loading"}
                                                onClick={() =>
                                                    handleStatusChange(o._id, "Processing")
                                                }
                                            >
                                                Processing
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary"
                                                disabled={actionStatus === "loading"}
                                                onClick={() =>
                                                    handleStatusChange(o._id, "Shipped")
                                                }
                                            >
                                                Shipped
                                            </button>
                                            <button
                                                className="btn btn-outline-success"
                                                disabled={actionStatus === "loading"}
                                                onClick={() =>
                                                    handleStatusChange(o._id, "Delivered")
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

            {orders &&
                orders.length === 0 &&
                ordersStatus === "succeeded" && (
                    <p className="text-muted">No orders found.</p>
                )}
        </AdminLayout>
    );
};

export default AdminOrders;
