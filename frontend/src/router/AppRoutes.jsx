import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default AppRoutes;
