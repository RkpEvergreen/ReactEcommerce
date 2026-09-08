import { useNavigate, useParams } from "react-router-dom";

function EditCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Category ${id} updated successfully.`);
        navigate("/admin/categories");
    };

    return (
        <div className="admin-page">
            <h1>Edit Category</h1>

            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text" defaultValue="Clothing" required />
                </div>

                <div className="form-group">
                    <label>Slug</label>
                    <input type="text" defaultValue="clothing" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="4" defaultValue="Fashion essentials and everyday wear." />
                </div>

                <button type="submit" className="save-product-btn">
                    Update Category
                </button>
            </form>
        </div>
    );
}

export default EditCategory;
