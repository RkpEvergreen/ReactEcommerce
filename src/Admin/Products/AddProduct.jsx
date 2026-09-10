import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import "./AddProduct.css";

function AddProduct() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            const response = await fetch("http://localhost:5000/api/products", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Unable to create product");
            }

            alert("Product added successfully");
            navigate("/admin/products");
        } catch (error) {
            console.error(error);
            alert("Failed to add product");
        }
    };

    return (
        <div className="admin-page product-editor-page">
            <div className="product-editor-heading">
                <h1>Add Product</h1>
                <p>Add a new product to your store</p>
            </div>
            <ProductForm onSubmit={handleSubmit} buttonText="Add Product" />
        </div>
    );
}

export default AddProduct;
