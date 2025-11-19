import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDeliveryPartners } from "../features/admin/adminSlice.js";
import AdminLayout from "../layouts/AdminLayout.jsx";

const AdminDeliveryPartners = () => {
    const dispatch = useDispatch();
    const {
        deliveryPartners,
        deliveryPartnersStatus,
        deliveryPartnersError,
    } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminDeliveryPartners());
    }, [dispatch]);

    return (
        <AdminLayout>
            <h3 className="mb-3">Delivery Partners</h3>

            {deliveryPartnersStatus === "loading" && (
                <p className="text-muted">Loading delivery partners...</p>
            )}

            {deliveryPartnersError && (
                <p className="text-danger">{deliveryPartnersError}</p>
            )}

            {deliveryPartners &&
                deliveryPartners.length > 0 && (
                    <div className="table-responsive">
                        <table className="table table-sm align-middle">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Total Orders Delivered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveryPartners.map((d) => (
                                    <tr key={d._id}>
                                        <td>{d.name}</td>
                                        <td>{d.email}</td>
                                        <td>{d.totalDelivered ?? 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            {deliveryPartners &&
                deliveryPartners.length === 0 &&
                deliveryPartnersStatus === "succeeded" && (
                    <p className="text-muted">No delivery partners found.</p>
                )}
        </AdminLayout>
    );
};

export default AdminDeliveryPartners;
