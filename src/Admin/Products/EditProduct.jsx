import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "./ProductForm";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);


    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await fetch(
                    `http://localhost:5000/api/products/${id}`
                );

                const data = await response.json();

                setProduct(data);

            } catch (error) {

                console.error(error);

            }

        };

        fetchProduct();

    }, [id]);


    const handleSubmit = async (formData) => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/products/${id}`,
                {
                    method: "PUT",
                    body: formData
                }
            );


            if (!response.ok) {
                throw new Error(
                    "Unable to update product"
                );
            }


            alert("Product updated successfully");

            navigate("/admin/products");

        } catch (error) {

            console.error(error);

            alert("Failed to update product");

        }
    };


    if (!product) {
        return <p>Loading...</p>;
    }


    return (

        <div>

            <h1>Edit Product</h1>

            <ProductForm
                product={product}
                onSubmit={handleSubmit}
                buttonText="Update Product"
            />

        </div>

    );
}

export default EditProduct;