import { useState } from "react";
import ProductImageUpload from "./ProductImageUpload";

function ProductForm({
    product = {},
    onSubmit,
    buttonText = "Save Product"
}) {

    const [name, setName] = useState(
        product.name || ""
    );

    const [description, setDescription] = useState(
        product.description || ""
    );

    const [price, setPrice] = useState(
        product.price || ""
    );

    const [stock, setStock] = useState(
        product.stock || ""
    );

    const [category, setCategory] = useState(
        product.category || ""
    );

    const [image, setImage] = useState(null);


    const handleSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("category", category);


        if (image) {
            formData.append("image", image);
        }


        onSubmit(formData);
    };


    return (

        <form
            className="product-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">

                <label>
                    Product Name
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

            </div>


            <div className="form-group">

                <label>
                    Description
                </label>

                <textarea
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    rows="5"
                />

            </div>


            <div className="form-row">

                <div className="form-group">

                    <label>
                        Price
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Stock
                    </label>

                    <input
                        type="number"
                        value={stock}
                        onChange={(e) =>
                            setStock(e.target.value)
                        }
                        required
                    />

                </div>

            </div>


            <div className="form-group">

                <label>
                    Category
                </label>

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >

                    <option value="">
                        Select Category
                    </option>

                    <option value="Bags">
                        Bags
                    </option>

                    <option value="Shoes">
                        Shoes
                    </option>

                    <option value="Wallets">
                        Wallets
                    </option>

                    <option value="Clothing">
                        Clothing
                    </option>

                    <option value="Watches">
                        Watches
                    </option>

                    <option value="Sun Glasses">
                        Sun Glasses
                    </option>

                </select>

            </div>


            <ProductImageUpload
                onImageSelect={setImage}
                existingImage={product.image}
            />


            <button
                type="submit"
                className="save-product-btn"
            >
                {buttonText}
            </button>

        </form>
    );
}

export default ProductForm;