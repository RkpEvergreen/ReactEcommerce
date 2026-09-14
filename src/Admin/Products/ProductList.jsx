import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    SlidersHorizontal,
    Upload,
    Download,
    MoreHorizontal,
    Eye
} from "lucide-react";

import "./ProductList.css";
import { getProductImageUrl } from "../../utils/productImage";

function ProductList() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");


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

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (loading) {
        return <p>Loading products...</p>;
    }


    return (

        <div className="admin-products">

            <div className="products-toolbar">
                <div>
                    <h1>Products</h1>
                    <p>Manage your products inventory</p>
                </div>

                <div className="products-toolbar-actions">
                    <button type="button" className="products-secondary-btn">
                        <Download size={14} /> Export
                    </button>
                    <button type="button" className="products-secondary-btn">
                        <Upload size={14} /> Import
                    </button>
                    <button type="button" className="products-bulk-btn">Bulk Action</button>
                    <button type="button" className="products-delete-btn" disabled>Delete</button>
                    <Link to="/admin/products/add" className="add-product-btn">
                        <Plus size={16} /> Add Product
                    </Link>
                </div>
            </div>

            <div className="products-filter-row">
                <div className="products-filters">
                    <label className="products-search">
                        <Search size={15} />
                        <input
                            type="search"
                            placeholder="Search by product name"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </label>
                    <button type="button" className="products-filter-btn">
                        <SlidersHorizontal size={14} /> Category
                    </button>
                    <button type="button" className="products-filter-btn">
                        <SlidersHorizontal size={14} /> Price
                    </button>
                </div>
                <button type="button" className="products-view-btn">
                    <Eye size={14} /> View
                </button>
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

                        {filteredProducts.map(product => (

                            <tr key={product.id}>

                                <td>

                                    <img
                                        src={getProductImageUrl(product.image_url || product.image)}
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
                                        <button type="button" className="more-btn" aria-label={`More actions for ${product.name}`}>
                                            <MoreHorizontal size={16} />
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