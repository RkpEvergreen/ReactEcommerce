import { Link } from "react-router-dom";

const categories = [
    { id: 1, name: "Bags", slug: "bags", products: 18 },
    { id: 2, name: "Shoes", slug: "shoes", products: 24 },
    { id: 3, name: "Wallets", slug: "wallets", products: 14 },
    { id: 4, name: "Clothing", slug: "clothing", products: 32 },
    { id: 5, name: "Watches", slug: "watches", products: 10 }
];

function CategoryList() {
    return (
        <div className="admin-page">
            <div className="page-title">
                <div>
                    <h1>Categories</h1>
                    <p>Manage your store categories</p>
                </div>

                <Link to="/admin/categories/add" className="add-product-btn">
                    Add Category
                </Link>
            </div>

            <div className="product-table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Products</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.slug}</td>
                                <td>{category.products}</td>
                                <td>
                                    <div className="product-actions">
                                        <Link
                                            to={`/admin/categories/edit/${category.id}`}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </Link>
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

export default CategoryList;
