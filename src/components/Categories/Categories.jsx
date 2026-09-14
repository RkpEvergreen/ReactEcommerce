import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getCategoryImageUrl } from "../../utils/categoryImage";

import "./Categories.css";

function Categories() {
    const sliderRef = useRef(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/categories")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to load categories");
                }
                return response.json();
            })
            .then(setCategories)
            .catch((error) => console.error("Error loading categories:", error));
    }, []);

    const scrollLeft = () => {

        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {

        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="categories-section">

            {/* Header */}

            <div className="categories-header">

                <h2>
                    Categories you might like
                </h2>

                <Link
                    to="/products"
                    className="view-all-collection"
                >
                    View All Collection
                </Link>

            </div>


            {/* Category carousel */}

            <div className="categories-slider-wrapper">

                {/* Left button */}

                <button
                    type="button"
                    className="category-arrow category-arrow-left"
                    onClick={scrollLeft}
                    aria-label="Previous categories"
                >
                    <ChevronLeft size={28} />
                </button>


                {/* Categories */}

                <div
                    className="categories-slider"
                    ref={sliderRef}
                >

                    {categories.map((category) => (

                        <Link
                            key={category.id}
                            to={`/products?category=${category.slug}`}
                            className="category-card"
                        >

                            <div className="category-image-wrapper">

                                <img
                                    src={getCategoryImageUrl(category.image_url)}
                                    alt={category.name}
                                    className="category-image"
                                />

                            </div>

                            <h3>
                                {category.name}
                            </h3>

                            <p>
                                {category.products} items
                            </p>

                        </Link>

                    ))}

                </div>


                {/* Right button */}

                <button
                    type="button"
                    className="category-arrow category-arrow-right"
                    onClick={scrollRight}
                    aria-label="Next categories"
                >
                    <ChevronRight size={28} />
                </button>

            </div>

        </section>
    );
}

export default Categories;