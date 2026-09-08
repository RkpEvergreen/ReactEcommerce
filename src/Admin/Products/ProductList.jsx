import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Plus,
    Pencil,
    Trash2
} from "lucide-react";

import "./ProductList.css";

function ProductList() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchProducts = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/products"
            );

            const data = await response.json();

            setProducts(data);

        } catch (error) {

            console.error(
                "Error fetching products:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);


    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            const response = await fetch(
                `http://localhost:5000/api/products/${id}`,
                {
                    method: "DELETE"
                }
            );


            if (!response.ok) {
                throw new Error("Delete failed");
            }


            setProducts(
                products.filter(
                    product => product.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert("Unable to delete product");

        }
    };


    if (loading) {
        return <p>Loading products...</p>;
    }


    return (

        <div className="admin-products">

            <div className="page-title">

                <div>
                    <h1>Products</h1>
                    <p>Manage your products</p>
                </div>

                <Link
                    to="/admin/products/add"
                    className="add-product-btn"
                >
                    <Plus size={18} />
                    Add Product
                </Link>

            </div>


            <div className="product-table-container">

                <table className="product-table">

                    <thead>

                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>

                    </thead>


                    <tbody>

                        {products.map(product => (

                            <tr key={product.id}>

                                <td>

                                    <img
                                        src={`http://localhost:5000/uploads/products/${product.image}`}
                                        alt={product.name}
                                        className="admin-product-image"
                                    />

                                </td>


                                <td>
                                    {product.name}
                                </td>


                                <td>
                                    {product.category || "-"}
                                </td>


                                <td>
                                    ${product.price}
                                </td>


                                <td>
                                    {product.stock}
                                </td>


                                <td>

                                    <div className="product-actions">

                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="edit-btn"
                                        >
                                            <Pencil size={16} />
                                        </Link>


                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteProduct(
                                                    product.id
                                                )
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default ProductList;