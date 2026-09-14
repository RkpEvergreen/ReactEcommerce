import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

function AddCategory() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", slug: "", description: "" });
    const [image, setImage] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));
            if (image) {
                formData.append("image", image);
            }
            const response = await fetch("http://localhost:5000/api/categories", {
                method: "POST",
                body: formData
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.error || "Unable to create category");
            }
            navigate("/admin/categories");
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-page category-editor-page">
            <div className="category-editor-heading">
                <h1>Add Category</h1>
                <p>Create a category for organizing your products</p>
            </div>
            <form className="category-form" onSubmit={handleSubmit}>
                <div className="category-form-group">
                    <label htmlFor="category-name">Category Name</label>
                    <input id="category-name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="category-form-group">
                    <label htmlFor="category-image">Category Image</label>
                    <input id="category-image" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => setImage(event.target.files[0] || null)} />
                </div>
                <div className="category-form-group">
                    <label htmlFor="category-slug">Slug</label>
                    <input id="category-slug" name="slug" value={form.slug} onChange={handleChange} placeholder="Optional - generated from name" />
                </div>
                <div className="category-form-group">
                    <label htmlFor="category-description">Description</label>
                    <textarea id="category-description" name="description" rows="4" value={form.description} onChange={handleChange} />
                </div>
                <div className="category-form-actions">
                    <button type="button" onClick={() => navigate("/admin/categories")}>Cancel</button>
                    <button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Category"}</button>
                </div>
            </form>
        </div>
    );
}

export default AddCategory;
