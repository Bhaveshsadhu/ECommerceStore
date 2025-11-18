// src/components/Layout/Footer.jsx

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-5 pt-5 pb-3 text-light" style={{ backgroundColor: "#0B1220" }}>
            <div className="container">
                {/* Top section */}
                <div className="row gy-4">
                    {/* Brand + tagline */}
                    <div className="col-12 col-md-4">
                        <h4 className="fw-bold mb-2">UrbanCart</h4>
                        <p className="text-white-50 mb-3">
                            Your one-stop shop for modern gadgets, fashion, and lifestyle essentials.
                            Fast delivery, secure checkout, and 24/7 support.
                        </p>
                        <div className="d-flex gap-2">
                            <span className="badge rounded-pill bg-primary">Secure Payments</span>
                            <span className="badge rounded-pill bg-secondary">Fast Delivery</span>
                        </div>
                    </div>

                    {/* Shop links */}
                    <div className="col-6 col-md-2">
                        <h6 className="text-uppercase text-white-50 small mb-3">Shop</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                                <a href="/products" className="text-decoration-none text-light small">
                                    All Products
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-light small">
                                    New Arrivals
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-light small">
                                    Best Sellers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-decoration-none text-light small">
                                    Deals & Offers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support links */}
                    <div className="col-6 col-md-2">
                        <h6 className="text-uppercase text-white-50 small mb-3">Support</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-light small">
                                    Help Center
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-light small">
                                    Shipping Info
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-decoration-none text-light small">
                                    Returns & Refunds
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-decoration-none text-light small">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-12 col-md-4">
                        <h6 className="text-uppercase text-white-50 small mb-3">Stay in the loop</h6>
                        <p className="text-white-50 small mb-3">
                            Join our newsletter to get updates on new products, special offers and more.
                        </p>
                        <form className="d-flex flex-column flex-sm-row gap-2">
                            <input
                                type="email"
                                className="form-control form-control-sm bg-dark border-0 text-light"
                                placeholder="Enter your email"
                            />
                            <button type="submit" className="btn btn-sm btn-primary">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <hr className="border-secondary mt-4 mb-3" />

                {/* Bottom section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <p className="mb-0 text-white-50 small">
                        © {year} UrbanCart. All rights reserved.
                    </p>

                    <div className="d-flex align-items-center gap-3">
                        <a href="#" className="text-white-50 text-decoration-none small">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-white-50 text-decoration-none small">
                            Terms & Conditions
                        </a>
                        <div className="vr d-none d-md-block text-secondary" />
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white-50 text-decoration-none small">
                                🡵 Instagram
                            </a>
                            <a href="#" className="text-white-50 text-decoration-none small">
                                🡵 Facebook
                            </a>
                            <a href="#" className="text-white-50 text-decoration-none small">
                                🡵 Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
