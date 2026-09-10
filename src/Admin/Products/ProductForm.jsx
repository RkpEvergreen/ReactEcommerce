import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductImageUpload from "./ProductImageUpload";
import "./AddProduct.css";

function ProductForm({ product = {}, onSubmit, buttonText = "Save Product" }) {
    const navigate = useNavigate();
    const [name, setName] = useState(product.name || "");
    const [description, setDescription] = useState(product.description || "");
    const [price, setPrice] = useState(product.price || "");
    const [salePrice, setSalePrice] = useState(product.sale_price || "");
    const [stock, setStock] = useState(product.stock_quantity ?? product.stock ?? "");
    const [categoryId, setCategoryId] = useState(product.category_id || "");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("http://localhost:5000/api/categories");
            if (!response.ok) {
                throw new Error("Unable to load categories");
            }
            setCategories(await response.json());
        };

        fetchCategories().catch((error) => {
            console.error("Error loading categories:", error);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("sale_price", salePrice);
        formData.append("stock", stock);
        formData.append("category_id", categoryId);

        if (image) {
            formData.append("image", image);
        }

        onSubmit(formData);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="product-name">Product Name</label>
                <input
                    id="product-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter product name"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="product-description">Description</label>
                <textarea
                    id="product-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Enter product description"
                    rows="5"
                />
            </div>

            <div className="form-group">
                <label htmlFor="product-price">Product Price</label>
                <input
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="0.00"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="sale-price">Sale Price</label>
                <input
                    id="sale-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={salePrice}
                    onChange={(event) => setSalePrice(event.target.value)}
                    placeholder="Optional"
                />
            </div>

            <div className="form-group">
                <label htmlFor="product-stock">Stock</label>
                <input
                    id="product-stock"
                    type="number"
                    min="0"
                    step="1"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                    placeholder="0"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="product-category">Category</label>
                <select
                    id="product-category"
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <ProductImageUpload
                onImageSelect={setImage}
                existingImage={product.image_url || product.image}
            />

            <div className="product-form-actions">
                <button
                    type="button"
                    className="cancel-product-btn"
                    onClick={() => navigate("/admin/products")}
                >
                    Cancel
                </button>
                <button type="submit" className="save-product-btn">
                    {buttonText}
                </button>
            </div>
        </form>
    );
}

export default ProductForm;
