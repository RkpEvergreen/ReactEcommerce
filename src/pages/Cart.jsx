import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);


    useEffect(() => {

        const savedCart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        setCart(savedCart);

    }, []);


    const updateCart = (newCart) => {

        setCart(newCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(newCart)
        );

    };


    const increase = (index) => {

        const newCart = [...cart];

        newCart[index].quantity += 1;

        updateCart(newCart);
    };


    const decrease = (index) => {

        const newCart = [...cart];

        newCart[index].quantity = Math.max(
            1,
            newCart[index].quantity - 1
        );

        updateCart(newCart);
    };


    const removeItem = (index) => {

        const newCart = cart.filter(
            (_, i) => i !== index
        );

        updateCart(newCart);
    };


    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.quantity),
        0
    );


    return (
        <div className="cart-page">

            <div className="cart-breadcrumb">

                <Link to="/">
                    Homepage
                </Link>

                <span>›</span>

                <span>Cart</span>

            </div>


            <h1>
                Shopping Cart
            </h1>


            {cart.length === 0 ? (

                <div className="empty-cart">

                    <h2>
                        Your cart is empty
                    </h2>

                    <Link to="/products">
                        Continue Shopping
                    </Link>

                </div>

            ) : (

                <div className="cart-container">

                    <div className="cart-items">

                        {cart.map((item, index) => (

                            <div
                                className="cart-item"
                                key={`${item.id}-${index}`}
                            >

                                <img
                                    src={
                                        item.image
                                    }
                                    alt={item.name}
                                />


                                <div className="cart-item-info">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        Color:
                                        {item.color}
                                    </p>

                                    <p>
                                        Size:
                                        {item.size}
                                    </p>

                                    <strong>
                                        $
                                        {Number(
                                            item.price
                                        ).toFixed(2)}
                                    </strong>

                                </div>


                                <div className="cart-quantity">

                                    <button
                                        onClick={() =>
                                            decrease(index)
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increase(index)
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                <button
                                    className="remove-cart"
                                    onClick={() =>
                                        removeItem(index)
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        ))}

                    </div>


                    <div className="cart-summary">

                        <h2>
                            Cart Summary
                        </h2>

                        <div>
                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ${total.toFixed(2)}
                            </strong>
                        </div>


                        <div>
                            <span>
                                Shipping
                            </span>

                            <strong>
                                Free
                            </strong>
                        </div>


                        <hr />


                        <div className="cart-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ${total.toFixed(2)}
                            </strong>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/checkout")
                            }
                        >
                            Proceed to Checkout
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Cart;