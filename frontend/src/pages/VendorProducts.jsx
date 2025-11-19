import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorProducts } from "../features/vendor/vendorSlice.js";
import VendorLayout from "../layouts/VendorLayout.jsx";
import { Link } from "react-router-dom";

const VendorProducts = () => {
    const dispatch = useDispatch();
    const { products, productsStatus, productsError } = useSelector(
        (state) => state.vendor
    );

    useEffect(() => {
        dispatch(fetchVendorProducts());
    }, [dispatch]);

    return (
        <VendorLayout>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">My Products</h3>
                {/* Future: Add Product button / modal */}
                {/* <button className="btn btn-primary btn-sm">Add Product</button> */}
            </div>

            {productsStatus === "loading" && (
                <p className="text-muted">Loading products...</p>
            )}

            {productsError && (
                <p className="text-danger">Error: {productsError}</p>
            )}

            {products && products.length === 0 && (
                <p className="text-muted">You have no products yet.</p>
            )}

            {products && products.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm align-middle">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Active</th>
                                <th>Approved</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p._id}>
                                    <td>{p.name}</td>
                                    <td>${p.price?.toFixed(2)}</td>
                                    <td>{p.stock}</td>
                                    <td>{p.isActive ? "Yes" : "No"}</td>
                                    <td>{p.isApproved ? "Yes" : "No"}</td>
                                    <td>
                                        <Link
                                            to={`/products/${p._id}`}
                                            className="btn btn-outline-primary btn-sm"
                                        >
                                            View
                                        </Link>
                                        {/* Future: edit/delete product buttons */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </VendorLayout>
    );
};

export default VendorProducts;
