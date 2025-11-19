import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        );
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
