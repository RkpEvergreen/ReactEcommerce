import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import banner1 from "../../assets/banner/banner-1.jpg";
import banner2 from "../../assets/banner/banner-2.jpg";
import banner3 from "../../assets/banner/banner-3.jpg";

import "./HeroBanner.css";

const slides = [
    {
        id: 1,
        image: banner1,
        title: (
            <>
                We Picked Every Item
                <br />
                With Care,{" "}
                <strong>You Must Try</strong>
                <br />
                Atleast Once.
            </>
        ),
        buttonText: "Go To Collection",
        link: "/products",
    },
    {
        id: 2,
        image: banner2,
        title: (
            <>
                Discover Our
                <br />
                <strong>New Collection</strong>
                <br />
                Today.
            </>
        ),
        buttonText: "Shop Now",
        link: "/products",
    },
    {
        id: 3,
        image: banner3,
        title: (
            <>
                Find Your
                <br />
                Perfect Style
                <br />
                <strong>Today.</strong>
            </>
        ),
        buttonText: "Explore Now",
        link: "/products",
    },
];

function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((previous) =>
                (previous + 1) % slides.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="hero-banner">

            <div className="hero-slider">

                {slides.map((slide, index) => (

                    <article
                        key={slide.id}
                        className={`hero-slide ${
                            index === currentSlide ? "active" : ""
                        }`}
                    >

                        <img
                            src={slide.image}
                            alt="Fashion collection"
                            className="hero-slide-image"
                        />

                        <div className="hero-slide-overlay">

                            <div className="hero-content">

                                <h1 className="hero-title">
                                    {slide.title}
                                </h1>

                                <Link
                                    to={slide.link}
                                    className="hero-button"
                                >
                                    <span>
                                        {slide.buttonText}
                                    </span>

                                    <ArrowRight size={22} />
                                </Link>

                            </div>

                        </div>

                    </article>

                ))}

                {/* Slider indicators */}
                <div className="hero-indicators">

                    {slides.map((slide, index) => (

                        <button
                            key={slide.id}
                            type="button"
                            className={`hero-indicator ${
                                index === currentSlide
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}

export default HeroBanner;