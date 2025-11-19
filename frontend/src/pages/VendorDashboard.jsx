import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVendorStats } from "../features/vendor/vendorSlice.js";
import VendorLayout from "../layouts/VendorLayout.jsx";
import StatsCard from "../components/StatsCard.jsx";

const VendorDashboard = () => {
    const dispatch = useDispatch();
    const { stats, statsStatus, statsError } = useSelector(
        (state) => state.vendor
    );

    useEffect(() => {
        dispatch(fetchVendorStats());
    }, [dispatch]);

    return (
        <VendorLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Vendor Dashboard</h2>
                <Link to="/vendor/products" className="btn btn-primary">
                    Manage Products
                </Link>
            </div>

            {statsStatus === "loading" && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mt-3">Loading stats...</p>
                </div>
            )}

            {statsError && (
                <div className="alert alert-danger">{statsError}</div>
            )}

            {stats && (
                <>
                    <div className="row g-3 mb-4">
                        <StatsCard
                            title="Total Products"
                            value={stats.totalProducts ?? 0}
                            colorClass="text-primary"
                        />
                        <StatsCard
                            title="Total Orders"
                            value={stats.totalOrders ?? 0}
                            colorClass="text-info"
                        />
                        <StatsCard
                            title="Total Revenue"
                            value={`$${Number(stats.totalRevenue || 0).toFixed(2)}`}
                            colorClass="text-success"
                        />
                        <StatsCard
                            title="Pending Orders"
                            value={stats.pendingOrders ?? 0}
                            colorClass="text-warning"
                        />
                    </div>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 rounded-3">
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-3">Quick Actions</h5>
                                    <div className="d-grid gap-2">
                                        <Link
                                            to="/vendor/products"
                                            className="btn btn-outline-primary text-start"
                                        >
                                            View Products
                                        </Link>
                                        <Link
                                            to="/vendor/orders"
                                            className="btn btn-outline-secondary text-start"
                                        >
                                            View Orders
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </VendorLayout>
    );
};

export default VendorDashboard;
