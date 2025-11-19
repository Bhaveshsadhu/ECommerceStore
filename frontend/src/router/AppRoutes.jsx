import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import OrderDetailsPage from "../pages/OrderDetailsPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import VendorDashboard from "../pages/VendorDashboard.jsx";
import VendorProducts from "../pages/VendorProducts.jsx";
import VendorOrders from "../pages/VendorOrders.jsx";
import VendorOrderDetails from "../pages/VendorOrderDetails.jsx";
import DeliveryDashboard from "../pages/DeliveryDashboard.jsx";
import DeliveryOrders from "../pages/DeliveryOrders.jsx";



const AppRoutes = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/my-orders"
                        element={
                            <ProtectedRoute>
                                <MyOrders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders/:id"
                        element={
                            <ProtectedRoute>
                                <OrderDetailsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vendor/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                                <VendorDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vendor/products"
                        element={
                            <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                                <VendorProducts />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vendor/orders"
                        element={
                            <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                                <VendorOrders />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/vendor/orders/:id"
                        element={
                            <ProtectedRoute allowedRoles={["vendor", "admin"]}>
                                <VendorOrderDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/delivery/dashboard"
                        element={
                            <ProtectedRoute
                                allowedRoles={["delivery-partner", "admin"]}
                            >
                                <DeliveryDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/delivery/orders"
                        element={
                            <ProtectedRoute
                                allowedRoles={["delivery-partner", "admin"]}
                            >
                                <DeliveryOrders />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default AppRoutes;
