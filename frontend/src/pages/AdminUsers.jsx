import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAdminUsers,
    updateUserRole,
    toggleUserStatus,
} from "../features/admin/adminSlice.js";
import AdminLayout from "../layouts/AdminLayout.jsx";

const ROLES = ["user", "vendor", "delivery-partner", "admin"];

const AdminUsers = () => {
    const dispatch = useDispatch();
    const {
        users,
        usersStatus,
        usersError,
        actionStatus,
        actionError,
    } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminUsers());
    }, [dispatch]);

    const handleRoleChange = (id, role) => {
        dispatch(updateUserRole({ id, role }));
    };

    const handleToggleStatus = (user) => {
        dispatch(
            toggleUserStatus({ id: user._id, isActive: !user.isActive })
        );
    };

    return (
        <AdminLayout>
            <h3 className="mb-3">Users</h3>

            {usersStatus === "loading" && (
                <p className="text-muted">Loading users...</p>
            )}

            {usersError && <p className="text-danger">{usersError}</p>}

            {actionError && (
                <div className="alert alert-danger py-2">{actionError}</div>
            )}

            {users && users.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm align-middle">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Change Role</th>
                                <th>Block/Unblock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>{u.isActive ? "Active" : "Blocked"}</td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm"
                                            value={u.role}
                                            disabled={actionStatus === "loading"}
                                            onChange={(e) =>
                                                handleRoleChange(u._id, e.target.value)
                                            }
                                        >
                                            {ROLES.map((r) => (
                                                <option key={r} value={r}>
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            disabled={actionStatus === "loading"}
                                            onClick={() => handleToggleStatus(u)}
                                        >
                                            {u.isActive ? "Block" : "Unblock"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {users && users.length === 0 && usersStatus === "succeeded" && (
                <p className="text-muted">No users found.</p>
            )}
        </AdminLayout>
    );
};

export default AdminUsers;
