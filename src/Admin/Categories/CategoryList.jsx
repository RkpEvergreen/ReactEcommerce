import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import "./Category.css";

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        fetch("http://localhost:5000/api/categories")
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Unable to load categories");
                }
                return response.json().catch(() => {
                    throw new Error("The category service returned an invalid response.");
                });
            })
            .then((data) => {
                if (active) {
                    setCategories(data);
                }
            })
            .catch((error) => {
                console.error(error);
                if (active) {
                    alert(error.message);
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const deleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.error || "Unable to delete category");
            }
            setCategories((current) => current.filter((category) => category.id !== id));
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    if (loading) {
        return <p className="page-loading">Loading categories...</p>;
    }

    return (
        <div className="admin-page category-list-page">
            <div className="category-list-heading">
                <div>
                    <h1>Categories</h1>
                    <p>Manage your store categories</p>
                </div>
                <Link to="/admin/categories/add" className="category-add-btn"><Plus size={16} /> Add Category</Link>
            </div>
            <div className="category-table-container">
                <table className="category-table">
                    <thead>
                        <tr><th>ID</th><th>Name</th><th>Slug</th><th>Products</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td><strong>{category.name}</strong></td>
                                <td>{category.slug}</td>
                                <td>{category.products}</td>
                                <td>
                                    <div className="category-actions">
                                        <Link to={`/admin/categories/edit/${category.id}`} className="category-edit-btn" aria-label={`Edit ${category.name}`}><Pencil size={16} /></Link>
                                        <button type="button" className="category-delete-btn" onClick={() => deleteCategory(category.id)} aria-label={`Delete ${category.name}`}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length === 0 && <p className="category-empty">No categories found.</p>}
            </div>
        </div>
    );
}

export default CategoryList;
