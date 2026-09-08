import { useState } from "react";

function ProductGallery({ product }) {

    const [selectedImage, setSelectedImage] = useState(
        product.image
    );

    const imageUrl = (image) => {

        if (!image) {
            return "/products/placeholder.jpg";
        }

        if (image.startsWith("http")) {
            return image;
        }

        return `http://localhost:5000/uploads/products/${image}`;
    };


    return (
        <div className="product-gallery">

            <div className="product-thumbnails">

                {[1, 2, 3, 4, 5, 6].map((item) => (

                    <button
                        key={item}
                        className={
                            selectedImage === product.image
                                ? "thumbnail active"
                                : "thumbnail"
                        }
                        onClick={() =>
                            setSelectedImage(product.image)
                        }
                    >

                        <img
                            src={imageUrl(product.image)}
                            alt={product.name}
                        />

                    </button>

                ))}

            </div>


            <div className="product-main-image">

                <img
                    src={imageUrl(selectedImage)}
                    alt={product.name}
                />

            </div>

        </div>
    );
}

export default ProductGallery;