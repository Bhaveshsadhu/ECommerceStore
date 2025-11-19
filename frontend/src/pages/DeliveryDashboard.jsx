import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveryStats } from "../features/delivery/deliverySlice.js";
import DeliveryLayout from "../layouts/DeliveryLayout.jsx";

const DeliveryDashboard = () => {
    const dispatch = useDispatch();
    const { stats, statsStatus, statsError } = useSelector(
        (state) => state.delivery
    );

    useEffect(() => {
        dispatch(fetchDeliveryStats());
    }, [dispatch]);

    return (
        <DeliveryLayout>
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
                                <div className="text-muted small">Assigned Orders</div>
                                <div className="fs-4 fw-bold">
                                    {stats.assignedOrders ?? 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <div className="text-muted small">Delivered</div>
                                <div className="fs-4 fw-bold">
                                    {stats.deliveredOrders ?? 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-lg-3">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <div className="text-muted small">Out for Delivery</div>
                                <div className="fs-4 fw-bold">
                                    {stats.outForDelivery ?? 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DeliveryLayout>
    );
};

export default DeliveryDashboard;
