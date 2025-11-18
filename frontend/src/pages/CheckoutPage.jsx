// src/pages/CheckoutPage.jsx
const CheckoutPage = () => {
    return (
        <div className="row">
            <div className="col-lg-8 mb-4">
                <div className="bg-white rounded-3 shadow-sm p-4">
                    <h2 className="h5 mb-3">Checkout</h2>

                    {/* Step indicator (visual only for now) */}
                    <div className="d-flex justify-content-between mb-4">
                        <span className="fw-semibold text-primary">1. Shipping</span>
                        <span className="text-muted">2. Payment</span>
                        <span className="text-muted">3. Review</span>
                    </div>

                    <h6 className="mb-3">Shipping Address</h6>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">First Name</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last Name</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Address</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">City</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">State</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Postcode</label>
                            <input className="form-control" />
                        </div>
                    </div>

                    <button className="btn btn-primary mt-4">Continue to Payment</button>
                </div>
            </div>

            <div className="col-lg-4 mb-4">
                <div className="bg-white rounded-3 shadow-sm p-3">
                    <h6 className="mb-3">Order Summary</h6>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Items</span>
                        <span>$329.97</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Shipping</span>
                        <span>$10.00</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-semibold mb-3">
                        <span>Total</span>
                        <span>$339.97</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
