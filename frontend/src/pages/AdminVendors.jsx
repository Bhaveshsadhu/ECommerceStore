import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAdminVendors,
    updateVendorApproval,
} from "../features/admin/adminSlice.js";
import AdminLayout from "../layouts/AdminLayout.jsx";

const AdminVendors = () => {
    const dispatch = useDispatch();
    const {
        vendors,
        vendorsStatus,
        vendorsError,
        actionStatus,
        actionError,
    } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminVendors());
    }, [dispatch]);

    const handleApprovalChange = (vendor, isApproved) => {
        dispatch(
            updateVendorApproval({ id: vendor._id, isApproved })
        );
    };

    return (
        <AdminLayout>
            <h3 className="mb-3">Vendors</h3>

            {vendorsStatus === "loading" && (
                <p className="text-muted">Loading vendors...</p>
            )}

            {vendorsError && <p className="text-danger">{vendorsError}</p>}

            {actionError && (
                <div className="alert alert-danger py-2">{actionError}</div>
            )}

            {vendors && vendors.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm align-middle">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Approved</th>
                                <th>Toggle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map((v) => (
                                <tr key={v._id}>
                                    <td>{v.name}</td>
                                    <td>{v.email}</td>
                                    <td>{v.isApproved ? "Yes" : "No"}</td>
                                    <td>
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                className="btn btn-outline-success"
                                                disabled={actionStatus === "loading"}
                                                onClick={() =>
                                                    handleApprovalChange(v, true)
                                                }
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                disabled={actionStatus === "loading"}
                                                onClick={() =>
                                                    handleApprovalChange(v, false)
                                                }
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {vendors && vendors.length === 0 && vendorsStatus === "succeeded" && (
                <p className="text-muted">No vendors found.</p>
            )}
        </AdminLayout>
    );
};

export default AdminVendors;
