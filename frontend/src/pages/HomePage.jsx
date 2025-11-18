import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import ShopByCategory from "../components/products/ShopByCategory";
import Testimonials from "../components/testimonials/Testimonials";
import Newsletter from "../components/newsletter/Newsletter";

const HomePage = () => {
    const featuredProducts = [
        { _id: "1", name: "Studio Wireless Headphones", price: 199.99, category: "Audio" },
        { _id: "2", name: "Lumen Smart Watch", price: 249.0, category: "Wearables" },
        { _id: "3", name: "Orbit Gaming Mouse", price: 79.99, category: "Gaming" },
        { _id: "4", name: "Aero Running Sneakers", price: 139.99, category: "Footwear" },
        { _id: "5", name: "Studio Wireless Headphones", price: 199.99, category: "Audio" },
        { _id: "6", name: "Lumen Smart Watch", price: 249.0, category: "Wearables" },
        { _id: "7", name: "Orbit Gaming Mouse", price: 79.99, category: "Gaming" },
        { _id: "8", name: "Aero Running Sneakers", price: 139.99, category: "Footwear" },
    ];

    const pillars = [
        { title: "Free 2-day shipping", description: "Complimentary delivery on every order.", icon: "🚚" },
        { title: "Secure checkout", description: "Enterprise-grade encryption and fraud protection.", icon: "🔒" },
        { title: "Curated brands", description: "Hand-picked partners with premium products.", icon: "🏆" },
        { title: "24/7 Concierge", description: "Always-on support for seamless experiences.", icon: "💬" },
    ];

    const featuredScrollRef = useRef(null);

    useEffect(() => {
        const container = featuredScrollRef.current;
        if (!container) return;

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) return;

        const scrollStep = () => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (maxScroll <= 0) return;

            const firstCard = container.querySelector(".featured-card-wrapper");
            const cardWidth = firstCard?.getBoundingClientRect().width || container.clientWidth;
            const styles = getComputedStyle(container);
            const gap = parseFloat(styles.columnGap || styles.gap || 0);
            const increment = cardWidth + gap;

            const nextScroll = container.scrollLeft + increment;

            if (nextScroll >= maxScroll) {
                container.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                container.scrollTo({ left: nextScroll, behavior: "smooth" });
            }
        };

        const intervalId = setInterval(scrollStep, 2000);
        return () => clearInterval(intervalId);
    }, [featuredProducts.length]);

    return (
        <>
            <section className="hero-section mb-5">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <span className="badge-soft mb-3">New Collection · SS25</span>
                        <h1 className="display-5 fw-bold mb-3">
                            Elevate every day with <span className="text-primary">design-led essentials.</span>
                        </h1>
                        <p className="text-muted mb-4 fs-5">
                            Shop curated drops from the world’s most loved brands. Built for speed, trust, and stunning customer
                            experiences.
                        </p>
                        <div className="d-flex flex-column flex-sm-row gap-3">
                            <Link to="/products" className="btn btn-primary btn-lg px-4">
                                Shop the collection
                            </Link>
                            <a className="btn btn-outline-secondary btn-lg px-4" href="#featured">
                                Browse featured
                            </a>
                        </div>
                        <div className="d-flex flex-wrap gap-4 mt-4">
                            <div>
                                <p className="h2 fw-bold mb-0">120K+</p>
                                <small className="text-muted">Products shipped</small>
                            </div>
                            <div>
                                <p className="h2 fw-bold mb-0">4.9/5</p>
                                <small className="text-muted">Customer rating</small>
                            </div>
                            <div>
                                <p className="h2 fw-bold mb-0">98%</p>
                                <small className="text-muted">Next-day delivery</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="surface-card p-4">
                            <div className="row g-4">
                                {pillars.map((pillar) => (
                                    <div className="col-6" key={pillar.title}>
                                        <div className="surface-card h-100 text-start p-3">
                                            <div className="fs-3">{pillar.icon}</div>
                                            <p className="fw-semibold mb-1">{pillar.title}</p>
                                            <small className="text-muted">{pillar.description}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ShopByCategory />
            <Testimonials />
            <Newsletter />

            <section id="featured" className="mb-5">
                <div className="section-heading mb-4">
                    <div>
                        <p className="text-uppercase small text-muted mb-1">Featured</p>
                        <h2>Trending now</h2>
                    </div>
                    <Link to="/products" className="btn btn-outline-secondary">
                        View all products
                    </Link>
                </div>
                <div className="featured-scroll" ref={featuredScrollRef}>
                    {featuredProducts.map((product) => (
                        <div className="featured-card-wrapper" key={product._id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HomePage;
