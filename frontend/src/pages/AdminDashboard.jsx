import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../features/admin/adminSlice.js";
import AdminLayout from "../layouts/AdminLayout.jsx";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { stats, statsStatus, statsError } = useSelector(
        (state) => state.admin
    );

    useEffect(() => {
        dispatch(fetchAdminStats());
    }, [dispatch]);

    return (
        <AdminLayout>
            <h3 className="mb-3">Dashboard</h3>

            {statsStatus === "loading" && (
                <p className="text-muted">Loading stats...</p>
            )}

            {statsError && <p className="text-danger">{statsError}</p>}

            {stats && (
                <div className="row g-3">
                    <div className="col-sm-6 col-lg-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <div className="text-muted small">Users</div>
                                <div className="fs-4 fw-bold">
                                    {stats.totalUsers ?? 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <div className="text-muted small">Vendors</div>
                                <div className="fs-4 fw-bold">
                                    {stats.totalVendors ?? 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <div className="text-muted small">Orders</div>
                                <div className="fs-4 fw-bold">
                                    {stats.totalOrders ?? 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <div className="text-muted small">Revenue</div>
                                <div className="fs-5 fw-bold">
                                    ${Number(stats.totalRevenue || 0).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;
