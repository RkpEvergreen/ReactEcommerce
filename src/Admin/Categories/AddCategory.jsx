import { useNavigate } from "react-router-dom";

function AddCategory() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Category added successfully.");
        navigate("/admin/categories");
    };

    return (
        <div className="admin-page">
            <h1>Add Category</h1>

            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text" name="name" required />
                </div>

                <div className="form-group">
                    <label>Slug</label>
                    <input type="text" name="slug" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" rows="4" />
                </div>

                <button type="submit" className="save-product-btn">
                    Save Category
                </button>
            </form>
        </div>
    );
}

export default AddCategory;
