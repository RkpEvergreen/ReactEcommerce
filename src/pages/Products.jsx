import { useEffect, useMemo, useState } from "react";
import { Heart, ChevronRight, ShoppingCart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { getProductImageUrl } from "../utils/productImage";
import "./Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("default");
    const [searchParams] = useSearchParams();
    const selectedSlug = searchParams.get("category");

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/api/products"),
            fetch("http://localhost:5000/api/categories")
        ])
            .then(async ([productsResponse, categoriesResponse]) => {
                if (!productsResponse.ok || !categoriesResponse.ok) {
                    throw new Error("Unable to load catalog");
                }
                return Promise.all([
                    productsResponse.json(),
                    categoriesResponse.json()
                ]);
            })
            .then(([productData, categoryData]) => {
                setProducts(productData);
                setCategories(categoryData);
            })
            .catch((error) => console.error("Error loading catalog:", error))
            .finally(() => setLoading(false));
    }, []);

    const selectedCategory = categories.find(
        (category) => category.slug === selectedSlug
    );

    const visibleProducts = useMemo(() => {
        const filtered = selectedCategory
            ? products.filter((product) => (
                String(product.category_id) === String(selectedCategory.id) ||
                product.category_slug === selectedCategory.slug ||
                product.category?.toLowerCase() === selectedCategory.name.toLowerCase()
            ))
            : products;
        return [...filtered].sort((first, second) => {
            if (sort === "price-low") {
                return Number(first.price) - Number(second.price);
            }
            if (sort === "price-high") {
                return Number(second.price) - Number(first.price);
            }
            if (sort === "newest") {
                return Number(second.id) - Number(first.id);
            }
            return 0;
        });
    }, [products, selectedCategory, sort]);

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
                <h1>{selectedCategory?.name || "All Products"}</h1>

                <div className="breadcrumb">
                    <Link to="/">Homepage</Link>
                    <span>›</span>
                    <span>{selectedCategory?.name || "Products"}</span>
                </div>
            </div>

            <div className="products-layout">

                <aside className="products-sidebar">

                    <h3>Categories</h3>

                    <ul>
                        <li><Link className={!selectedSlug ? "active" : ""} to="/products">All Products</Link></li>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link className={selectedSlug === category.slug ? "active" : ""} to={`/products?category=${category.slug}`}>
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </aside>


                <section className="products-content">

                    <div className="products-category-intro">
                        <div>
                            <h2>{selectedCategory?.name || "All Products"} <span>{visibleProducts.length} Items</span></h2>
                            <p>{selectedCategory?.description || "Explore our latest collection of quality products, selected to make every occasion special."}</p>
                        </div>
                    </div>
                    <div className="products-toolbar">
                        <div className="products-filter-chips">
                            {["999 Store", "Best Selling", "New Arrivals", "Premium"].map((chip) => <button type="button" key={chip}>{chip}</button>)}
                        </div>
                        <label className="products-sort">SORT BY:
                            <select value={sort} onChange={(event) => setSort(event.target.value)}>
                                <option value="default">HandPicked</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest</option>
                            </select>
                        </label>
                    </div>


                    <div className="products-grid">

                        {visibleProducts.map((product) => (

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
                                        <button type="button" className="product-next" aria-label={`Preview ${product.name}`}><ChevronRight size={18} /></button>
                                        <div className="product-hover-actions">
                                            <button type="button" aria-label={`Add ${product.name} to wishlist`}><Heart size={18} /></button>
                                            <span><ShoppingCart size={16} /> Shop Now</span>
                                        </div>
                                    </div>
                                </Link>


                                <div className="product-name-row">
                                    <Link className="product-name" to={`/products/${product.id}`}>{product.name}</Link>
                                    <button type="button" aria-label={`Add ${product.name} to wishlist`}><Heart size={19} /></button>
                                </div>


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