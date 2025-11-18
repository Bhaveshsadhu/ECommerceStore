// src/pages/AdminDashboard.jsx
const AdminDashboard = () => {
    return (
        <div className="row">
            <aside className="col-md-3 mb-4">
                <div className="bg-white rounded-3 shadow-sm p-3">
                    <h6 className="text-muted text-uppercase small mb-3">Admin</h6>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2"><button className="btn btn-link p-0">Dashboard</button></li>
                        <li className="mb-2"><button className="btn btn-link p-0">Products</button></li>
                        <li className="mb-2"><button className="btn btn-link p-0">Orders</button></li>
                        <li className="mb-2"><button className="btn btn-link p-0">Users</button></li>
                        <li className="mb-2"><button className="btn btn-link p-0">Analytics</button></li>
                    </ul>
                </div>
            </aside>

            <section className="col-md-9">
                <div className="row g-3 mb-3">
                    <div className="col-md-4">
                        <div className="bg-white rounded-3 shadow-sm p-3">
                            <p className="text-muted small mb-1">Total Sales</p>
                            <h3 className="h4 mb-0">$12,450</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="bg-white rounded-3 shadow-sm p-3">
                            <p className="text-muted small mb-1">Orders Today</p>
                            <h3 className="h4 mb-0">34</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="bg-white rounded-3 shadow-sm p-3">
                            <p className="text-muted small mb-1">Customers</p>
                            <h3 className="h4 mb-0">1,203</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3 shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Recent Orders</h6>
                        <button className="btn btn-sm btn-primary">Add Product</button>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#12345</td>
                                    <td>John Doe</td>
                                    <td>2025-11-18</td>
                                    <td><span className="badge bg-success">Paid</span></td>
                                    <td>$199.99</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
