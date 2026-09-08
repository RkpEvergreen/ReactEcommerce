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
        alt: "Fashion collection with a go to collection promotion",
        buttonText: "Go To Collection",
    },
    {
        id: 2,
        image: banner2,
        alt: "Fashion collection with a shop now promotion",
        buttonText: "Product Category",
    },
    {
        id: 3,
        image: banner3,
        alt: "Fashion collection with an explore now promotion",
        buttonText: "Read More",
    },
];

function HeroBanner() {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentSlide((prev) => {
                return (prev + 1) % slides.length;
            });

        }, 5000);

        return () => clearInterval(timer);

    }, []);

    const slide = slides[currentSlide];

    return (
        <section className="hero-banner">

            <div className="hero-slider">

                <div className="hero-slide">
                    <img
                        src={slide.image}
                        alt={slide.alt}
                        className="hero-slide-image"
                    />
                    <Link
                        to="/products"
                        className="hero-slide-button"
                        aria-label={`${slide.buttonText} - slide ${currentSlide + 1}`}
                    >
                        <span>{slide.buttonText}</span>
                        <ArrowRight size={20} aria-hidden="true" />
                    </Link>
                </div>


                {/* INDICATORS */}

                <div className="hero-indicators">

                    {slides.map((item, index) => (

                        <button
                            key={item.id}
                            type="button"
                            className={
                                index === currentSlide
                                    ? "hero-indicator active"
                                    : "hero-indicator"
                            }
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}

export default HeroBanner;