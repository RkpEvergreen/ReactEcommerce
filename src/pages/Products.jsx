import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../utils/productImage";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading products:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="page-loading">
                Loading products...
            </div>
        );
    }

    return (
        <div className="products-page">

            <div className="products-header">
                <h1>Products</h1>

                <div className="breadcrumb">
                    <Link to="/">Homepage</Link>
                    <span>›</span>
                    <span>Products</span>
                </div>
            </div>

            <div className="products-layout">

                <aside className="products-sidebar">

                    <h3>Categories</h3>

                    <ul>
                        <li>
                            <Link to="/products">
                                All Products
                            </Link>
                        </li>

                        <li>
                            <Link to="/products?category=mens-wear">
                                Men's Wear
                            </Link>
                        </li>

                        <li>
                            <Link to="/products?category=womens-wear">
                                Women's Wear
                            </Link>
                        </li>

                        <li>
                            <Link to="/products?category=kids-wear">
                                Kid's Wear
                            </Link>
                        </li>

                        <li>
                            <Link to="/products?category=shoes">
                                Shoes
                            </Link>
                        </li>

                        <li>
                            <Link to="/products?category=bags">
                                Bags
                            </Link>
                        </li>
                    </ul>

                </aside>


                <section className="products-content">

                    <div className="products-toolbar">

                        <span>
                            {products.length} Products
                        </span>

                        <select>
                            <option>Default sorting</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest</option>
                        </select>

                    </div>


                    <div className="products-grid">

                        {products.map((product) => (

                            <div
                                className="product-item"
                                key={product.id}
                            >

                                <Link
                                    to={`/products/${product.id}`}
                                >
                                    <div className="product-image">

                                        <img
                                            src={getProductImageUrl(
                                                product.image_url || product.image
                                            )}
                                            alt={product.name}
                                        />

                                    </div>
                                </Link>


                                <Link
                                    className="product-name"
                                    to={`/products/${product.id}`}
                                >
                                    {product.name}
                                </Link>


                                <div className="product-price">
                                    ${Number(product.price).toFixed(2)}
                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            </div>

        </div>
    );
}

export default Products;