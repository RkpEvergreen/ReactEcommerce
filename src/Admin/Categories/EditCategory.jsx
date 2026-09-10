import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Category.css";

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/categories/${id}`)
            .then(async (response) => {
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(data.error || "Unable to load category");
                }
                setForm(data);
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.error || "Unable to update category");
            }
            navigate("/admin/categories");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    if (!form) {
        return <p className="page-loading">Loading category...</p>;
    }

    return (
        <div className="admin-page category-editor-page">
            <div className="category-editor-heading">
                <h1>Edit Category</h1>
                <p>Update your category information</p>
            </div>
            <form className="category-form" onSubmit={handleSubmit}>
                <div className="category-form-group">
                    <label htmlFor="category-name">Category Name</label>
                    <input id="category-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
                </div>
                <div className="category-form-group">
                    <label htmlFor="category-slug">Slug</label>
                    <input id="category-slug" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} required />
                </div>
                <div className="category-form-group">
                    <label htmlFor="category-description">Description</label>
                    <textarea id="category-description" rows="4" value={form.description || ""} onChange={(event) => setForm({ ...form, description: event.target.value })} />
                </div>
                <div className="category-form-actions">
                    <button type="button" onClick={() => navigate("/admin/categories")}>Cancel</button>
                    <button type="submit">Update Category</button>
                </div>
            </form>
        </div>
    );
}

export default EditCategory;
