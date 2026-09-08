import {
    Heart,
    Shuffle
} from "lucide-react";

function ProductActions({ product }) {

    const addToCart = () => {

        console.log(
            "Adding product:",
            product
        );

    };


    return (
        <>

            <div className="product-actions">

                <button
                    className="add-cart-btn"
                    onClick={addToCart}
                >
                    ADD TO CART - $
                    {Number(product.price).toFixed(2)}
                </button>

                <button className="icon-action">
                    <Shuffle size={16} />
                </button>

                <button className="icon-action">
                    <Heart size={17} />
                </button>

            </div>


            <button className="buy-now-btn">
                BUY IT NOW
            </button>

        </>
    );
}

export default ProductActions;