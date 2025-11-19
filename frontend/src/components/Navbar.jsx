import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice.js";
import useAuth from "../hooks/useAuth.js";
// import useAuth from "../features/auth/useAuth.js";
// import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">
                    E-Commerce
                </a>
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
                            <a className="nav-link" href="/">
                                Home
                            </a>
                        </li>
                        {/* Later: add Cart, My Orders, Vendor/Admin links */}
                    </ul>

                    <div className="d-flex align-items-center gap-2">
                        {!user && (
                            <>
                                <a className="btn btn-outline-light btn-sm" href="/login">
                                    Login
                                </a>
                                <a className="btn btn-primary btn-sm" href="/register">
                                    Register
                                </a>
                            </>
                        )}

                        {user && (
                            <>
                                <span className="text-light small me-2">
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
