function ProductPrice({ product }) {

    const price = Number(product.price || 0);

    const oldPrice = price + 20;

    return (
        <div className="product-price-row">

            <strong>
                ${price.toFixed(2)}
            </strong>

            <del>
                ${oldPrice.toFixed(2)}
            </del>

            <span className="discount">
                -25%
            </span>

        </div>
    );
}

export default ProductPrice;