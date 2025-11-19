import { Link, NavLink } from "react-router-dom";

const VendorLayout = ({ children }) => {
    return (
        <div className="row">
            <aside className="col-md-3 col-lg-2 mb-3">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Vendor Panel</h5>
                        <nav className="nav flex-column small">
                            <NavLink
                                to="/vendor/dashboard"
                                className={({ isActive }) =>
                                    "nav-link px-0 " + (isActive ? "fw-bold text-primary" : "")
                                }
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/vendor/products"
                                className={({ isActive }) =>
                                    "nav-link px-0 " + (isActive ? "fw-bold text-primary" : "")
                                }
                            >
                                My Products
                            </NavLink>
                            <NavLink
                                to="/vendor/orders"
                                className={({ isActive }) =>
                                    "nav-link px-0 " + (isActive ? "fw-bold text-primary" : "")
                                }
                            >
                                Orders
                            </NavLink>
                            <Link to="/" className="nav-link px-0 mt-2">
                                ← Back to Store
                            </Link>
                        </nav>
                    </div>
                </div>
            </aside>

            <section className="col-md-9 col-lg-10 mb-3">{children}</section>
        </div>
    );
};

export default VendorLayout;
