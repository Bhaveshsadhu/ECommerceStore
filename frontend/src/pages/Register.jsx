import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice.js";
import useAuth from "../hooks/useAuth.js";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user", // default role
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultAction = await dispatch(registerUser(form));

        if (registerUser.fulfilled.match(resultAction)) {
            // after successful register, go to home or login
            navigate("/");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <h3 className="mb-3 text-center">Register</h3>

                        {error && (
                            <div className="alert alert-danger py-2">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Bhavesh Sadhu"
                                />
                            </div>

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

                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">Customer</option>
                                    <option value="vendor">Vendor</option>
                                    <option value="delivery-partner">
                                        Delivery Partner
                                    </option>
                                    <option value="admin">Admin (for testing)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={status === "loading"}
                            >
                                {status === "loading" ? "Creating account..." : "Register"}
                            </button>
                        </form>

                        <p className="mt-3 mb-0 text-center">
                            Already have an account? <a href="/login">Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
