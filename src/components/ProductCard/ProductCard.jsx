import "./ProductCard.css";
import { getProductImageUrl } from "../../utils/productImage";

function ProductCard({ product }) {
    if (!product) {
        return null;
    }

    return (
        <article className="product-card">
            <div className="product-card-image-wrap">
                <img
                    src={getProductImageUrl(product.image_url || product.image)}
                    alt={product.name}
                    className="product-card-image"
                />
            </div>

            <div className="product-card-body">
                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-price">
                    ${Number(product.price || 0).toFixed(2)}
                </p>
            </div>
        </article>
    );
}

export default ProductCard;
