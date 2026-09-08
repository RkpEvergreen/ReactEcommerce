import { Link } from "react-router-dom";

import bags1 from "../../assets/featured-categories/bags-1.jpg";
import bags2 from "../../assets/featured-categories/bags-2.jpg";
import bags3 from "../../assets/featured-categories/bags-3.jpg";

import shoes1 from "../../assets/featured-categories/shoes-1.jpg";
import shoes2 from "../../assets/featured-categories/shoes-2.jpg";
import shoes3 from "../../assets/featured-categories/shoes-3.jpg";

import wallets1 from "../../assets/featured-categories/wallets-1.jpg";
import wallets2 from "../../assets/featured-categories/wallets-2.jpg";
import wallets3 from "../../assets/featured-categories/wallets-3.jpg";

import jewellers1 from "../../assets/featured-categories/jewellers-1.jpg";
import jewellers2 from "../../assets/featured-categories/jewellers-2.jpg";
import jewellers3 from "../../assets/featured-categories/jewellers-3.jpg";

import watches1 from "../../assets/featured-categories/watches-1.jpg";
import watches2 from "../../assets/featured-categories/watches-2.jpg";
import watches3 from "../../assets/featured-categories/watches-3.jpg";

import sunglasses1 from "../../assets/featured-categories/sunglasses-1.jpg";
import sunglasses2 from "../../assets/featured-categories/sunglasses-2.jpg";
import sunglasses3 from "../../assets/featured-categories/sunglasses-3.jpg";

import "./FeaturedCategories.css";


const categories = [
    {
        id: 1,
        name: "Bags",
        slug: "bags",
        products: [
            bags1,
            bags2,
            bags3
        ]
    },
    {
        id: 2,
        name: "Shoes",
        slug: "shoes",
        products: [
            shoes1,
            shoes2,
            shoes3
        ]
    },
    {
        id: 3,
        name: "Wallets",
        slug: "wallets",
        products: [
            wallets1,
            wallets2,
            wallets3
        ]
    },
    {
        id: 4,
        name: "Jewellers",
        slug: "jewellers",
        products: [
            jewellers1,
            jewellers2,
            jewellers3
        ]
    },
    {
        id: 5,
        name: "Watches",
        slug: "watches",
        products: [
            watches1,
            watches2,
            watches3
        ]
    },
    {
        id: 6,
        name: "Sun Glasses",
        slug: "sun-glasses",
        products: [
            sunglasses1,
            sunglasses2,
            sunglasses3
        ]
    }
];


function FeaturedCategories() {

    return (
        <section className="featured-categories">

            <div className="featured-categories-container">

                {/* Heading */}

                <h2 className="featured-categories-title">
                    Featured Categories
                </h2>


                {/* Grid */}

                <div className="featured-categories-grid">

                    {categories.map((category) => (

                        <Link
                            key={category.id}
                            to={`/products?category=${category.slug}`}
                            className="featured-category-card"
                        >

                            {/* Category title */}

                            <h3 className="featured-category-name">
                                {category.name}
                            </h3>


                            {/* Product images */}

                            <div className="featured-category-products">

                                {category.products.map(
                                    (image, index) => (

                                        <div
                                            className="featured-category-image"
                                            key={index}
                                        >

                                            <img
                                                src={image}
                                                alt={`${category.name} ${index + 1}`}
                                            />

                                        </div>

                                    )
                                )}

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default FeaturedCategories;