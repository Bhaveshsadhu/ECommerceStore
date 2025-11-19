import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice.js";
import useAuth from "../hooks/useAuth.js";
import { showSuccess, showError } from "../utils/toast.js";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { status, error, user } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const from = location.state?.from?.pathname || "/";

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultAction = await dispatch(loginUser(form));

        if (loginUser.fulfilled.match(resultAction)) {
            showSuccess("Login successful!");
            navigate(from, { replace: true });
        } else {
            showError(resultAction.payload || "Login failed");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card shadow-sm border-0 rounded-3">
                    <div className="card-body p-4">
                        <h3 className="mb-4 text-center">Login</h3>

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="********"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <p className="mt-3 mb-0 text-center">
                            Don&apos;t have an account?{" "}
                            <Link to="/register">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
