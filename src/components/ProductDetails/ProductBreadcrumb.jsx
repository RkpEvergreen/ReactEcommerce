import { Link } from "react-router-dom";

function ProductBreadcrumb({ product }) {

    return (
        <div className="product-breadcrumb">

            <Link to="/">
                Homepage
            </Link>

            <span>›</span>

            <Link to="/products">
                Products
            </Link>

            <span>›</span>

            <span>
                {product.name}
            </span>

        </div>
    );
}

export default ProductBreadcrumb;