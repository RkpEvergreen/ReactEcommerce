import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./ProductSection.css";
import { getProductImageUrl } from "../../utils/productImage";

const API_URL = "http://localhost:5000/api/products";

function ProductSection() {
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("new");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();

            setProducts(data);

        } catch (err) {
            console.error(err);
            setError("Unable to load products.");
        } finally {
            setLoading(false);
        }
    };


    /*
     * For now your API has:
     *
     * Laptop
     * Mobile Phone
     * Headphones
     *
     * So there may be only 3 products in MySQL.
     *
     * We display whatever products the API returns.
     */

    const getProducts = () => {

        if (activeTab === "new") {
            return products;
        }

        if (activeTab === "best") {
            return [...products].reverse();
        }

        if (activeTab === "sale") {
            return products.filter(
                (product) => Number(product.price) > 0
            );
        }

        return products;
    };


    const displayProducts = getProducts();


    return (
        <section className="product-section">

            {/* =================================
                TABS
            ================================= */}

            <div className="product-tabs">

                <button
                    type="button"
                    className={
                        activeTab === "new"
                            ? "product-tab active"
                            : "product-tab"
                    }
                    onClick={() => setActiveTab("new")}
                >
                    New Arrivals
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "best"
                            ? "product-tab active"
                            : "product-tab"
                    }
                    onClick={() => setActiveTab("best")}
                >
                    Best Seller
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "sale"
                            ? "product-tab active"
                            : "product-tab"
                    }
                    onClick={() => setActiveTab("sale")}
                >
                    On Sale
                </button>

            </div>


            {/* =================================
                CONTENT
            ================================= */}

            {loading && (
                <div className="product-message">
                    Loading products...
                </div>
            )}


            {error && !loading && (
                <div className="product-message error">
                    {error}
                </div>
            )}


            {!loading && !error && (
                <div className="product-grid">

                    {displayProducts.map((product) => (

                        <Link
                            to={`/products/${product.id}`}
                            className="product-card"
                            key={product.id}
                        >

                            {/* IMAGE */}

                            <div className="product-image-wrapper">

                                <img
                                    src={getProductImageUrl(
                                        product.image_url || product.image
                                    )}
                                    alt={product.name}
                                    className="product-image"
                                />

                                {/* SALE BADGE */}

                                <span className="sale-badge">
                                    -25%
                                </span>

                            </div>


                            {/* PRODUCT INFO */}

                            <div className="product-info">

                                <h3 className="product-name">
                                    {product.name}
                                </h3>


                                <div className="product-price">

                                    <span className="current-price">
                                        ₹{Number(product.price).toFixed(2)}
                                    </span>

                                </div>


                                {/* COLORS */}

                                <div className="product-colors">

                                    <span className="color color-1"></span>

                                    <span className="color color-2"></span>

                                    <span className="color color-3"></span>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>
            )}


            {/* =================================
                VIEW ALL
            ================================= */}

            {!loading && products.length > 0 && (

                <div className="view-products-wrapper">

                    <Link
                        to="/products"
                        className="view-products"
                    >
                        View All Products
                    </Link>

                </div>

            )}

        </section>
    );
}

export default ProductSection;