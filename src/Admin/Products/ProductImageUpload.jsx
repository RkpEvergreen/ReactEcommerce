import { useState } from "react";
import { getProductImageUrl } from "../../utils/productImage";

function ProductImageUpload({
    onImageSelect,
    existingImage
}) {

    const [preview, setPreview] = useState(
        existingImage ? getProductImageUrl(existingImage, null) : null
    );


    const handleChange = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        onImageSelect(file);

        setPreview(
            URL.createObjectURL(file)
        );
    };


    return (

        <div className="image-upload">

            <label>
                Product Image
            </label>


            {preview && (

                <div className="image-preview">

                    <img
                        src={preview}
                        alt="Product preview"
                    />

                </div>

            )}


            <label className="image-upload-dropzone">
                <span>Upload a product image</span>
                <small>PNG, JPG or WEBP (max 5 MB)</small>
                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleChange}
                />
            </label>

        </div>

    );
}

export default ProductImageUpload;