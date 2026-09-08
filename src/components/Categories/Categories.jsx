import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import promotionImage from "../../assets/categories/promotion.jpg";
import clothingImage from "../../assets/categories/clothing.jpg";
import shoesImage from "../../assets/categories/shoes.jpg";
import bagsImage from "../../assets/categories/bags.jpg";
import newInImage from "../../assets/categories/new-in.jpg";
import newInImage2 from "../../assets/categories/new-in.jpg";

import "./Categories.css";

const categories = [
    {
        id: 1,
        name: "Promotion",
        count: 12,
        image: promotionImage,
        slug: "promotion",
    },
    {
        id: 2,
        name: "Clothing",
        count: 12,
        image: clothingImage,
        slug: "clothing",
    },
    {
        id: 3,
        name: "Shoes",
        count: 12,
        image: shoesImage,
        slug: "shoes",
    },
    {
        id: 4,
        name: "Bags",
        count: 12,
        image: bagsImage,
        slug: "bags",
    },
    {
        id: 5,
        name: "New in",
        count: 12,
        image: newInImage,
        slug: "new-in",
    },
     {
        id: 6,
        name: "New in",
        count: 12,
        image: newInImage2,
        slug: "new-in",
    },
];

function Categories() {

    const sliderRef = useRef(null);

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
                                    src={category.image}
                                    alt={category.name}
                                    className="category-image"
                                />

                            </div>

                            <h3>
                                {category.name}
                            </h3>

                            <p>
                                {category.count} items
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