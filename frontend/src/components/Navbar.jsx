import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice.js";
import useAuth from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const cartItems = useSelector((state) => state.cart.items);

    const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    E-Commerce
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/my-orders">
                                    My Orders
                                </Link>
                            </li>
                        )}

                        {user && (user.role === "vendor" || user.role === "admin") && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/vendor/dashboard">
                                    Vendor Panel
                                </Link>
                            </li>
                        )}
                        {user &&
                            (user.role === "delivery-partner" || user.role === "admin") && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/delivery/dashboard">
                                        Delivery Panel
                                    </Link>
                                </li>
                            )}
                        {user && user.role === "admin" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/dashboard">
                                    Admin Panel
                                </Link>
                            </li>
                        )}


                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/my-orders">
                                    My Orders
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <Link
                            to="/cart"
                            className="btn btn-outline-light btn-sm position-relative"
                        >
                            Cart
                            {cartCount > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: "0.7rem" }}
                                >
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {!user && (
                            <>
                                <Link
                                    className="btn btn-outline-light btn-sm"
                                    to="/login"
                                >
                                    Login
                                </Link>
                                <Link
                                    className="btn btn-primary btn-sm"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <span className="text-light small me-1">
                                    {user.name} ({user.role})
                                </span>
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
