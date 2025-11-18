// src/components/testimonials/Testimonials.jsx

import { useState } from "react";

const testimonialsData = [
    {
        name: "Avery",
        location: "San Diego",
        image: "https://i.pravatar.cc/40?img=1",
        text: "Super fast shipping and a clean, intuitive UI.",
    },
    {
        name: "Noah",
        location: "Austin",
        image: "https://i.pravatar.cc/40?img=2",
        text: "Great selection. Checkout was effortless.",
    },
    {
        name: "Maya",
        location: "Seattle",
        image: "https://i.pravatar.cc/40?img=3",
        text: "Quality products at fair prices. Highly recommend!",
    },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const prevSlide = () => {
        setActiveIndex((prev) =>
            prev === 0 ? testimonialsData.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setActiveIndex((prev) =>
            prev === testimonialsData.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="bg-white rounded-4 p-4 shadow-sm mt-5">
            <h4 className="mb-4 fw-semibold">What Customers Say</h4>

            <div className="d-flex align-items-center">
                {/* Left Arrow */}
                <button
                    className="btn btn-light border me-3"
                    onClick={prevSlide}
                    style={{ borderRadius: "50%", width: "38px", height: "38px" }}
                >
                    ‹
                </button>

                {/* Slider Cards */}
                <div className="d-flex flex-grow-1 overflow-hidden">
                    <div
                        className="d-flex transition-all"
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)`,
                            transition: "0.5s ease",
                            width: `${testimonialsData.length * 100}%`,
                        }}
                    >
                        {testimonialsData.map((t, index) => (
                            <div
                                key={index}
                                className="p-3"
                                style={{ width: "33.33%" }}
                            >
                                <div className="border rounded-4 p-3 h-100">
                                    <div className="d-flex align-items-center mb-2">
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="rounded-circle me-3"
                                            width="40"
                                            height="40"
                                        />
                                        <div>
                                            <p className="fw-semibold mb-0">{t.name}</p>
                                            <p className="text-muted small mb-0">{t.location}</p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-muted">{t.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    className="btn btn-light border ms-3"
                    onClick={nextSlide}
                    style={{ borderRadius: "50%", width: "38px", height: "38px" }}
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default Testimonials;
