import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import ProductQuantity from "./ProductQuantity";
import ProductActions from "./ProductActions";
import DeliveryInfo from "./DeliveryInfo";
import ProductMeta from "./ProductMeta";

function ProductInfo({ product }) {

    return (
        <div className="product-info">

            <div className="product-category">
                CLOTHING
            </div>

            <h1>
                {product.name}
            </h1>

            <ProductRating />

            <ProductPrice
                product={product}
            />

            <p className="product-description">
                {product.description ||
                    "The garments labelled as Committed are products that have been produced using sustainable fibers or processes, reducing their environmental impact."
                }
            </p>

            <div className="viewing-now">
                👁 28 people are viewing this right now
            </div>

            <div className="product-divider"></div>

            <ProductColors />

            <ProductSizes />

            <ProductQuantity />

            <ProductActions
                product={product}
            />

            <DeliveryInfo />

            <ProductMeta
                product={product}
            />

        </div>
    );
}

export default ProductInfo;