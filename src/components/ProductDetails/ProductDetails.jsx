import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

import "./ProductDetails.css";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await fetch(
                    `http://localhost:5000/api/products/${id}`
                );

                if (!response.ok) {
                    throw new Error("Product not found");
                }

                const data = await response.json();

                setProduct(data);

            } catch (error) {

                console.error(error);

                setError("Unable to load product");

            } finally {

                setLoading(false);

            }
        };

        fetchProduct();

    }, [id]);


    if (loading) {
        return (
            <div className="product-loading">
                Loading product...
            </div>
        );
    }


    if (error) {
        return (
            <div className="product-error">
                {error}
            </div>
        );
    }


    return (
        <main className="product-details-page">

            <ProductBreadcrumb
                product={product}
            />

            <div className="product-details-layout">

                <ProductGallery
                    product={product}
                />

                <ProductInfo
                    product={product}
                />

            </div>

        </main>
    );
}

export default ProductDetails;