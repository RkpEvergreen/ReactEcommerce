import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Checkout() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });


    useEffect(() => {

        const savedCart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        setCart(savedCart);

    }, []);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.quantity),
        0
    );


    const placeOrder = (e) => {

        e.preventDefault();

        console.log({
            customer: form,
            items: cart,
            total
        });


        localStorage.removeItem("cart");

        alert("Order placed successfully");

        navigate("/orders");

    };


    return (
        <div className="checkout-page">

            <div className="checkout-breadcrumb">

                <Link to="/">
                    Homepage
                </Link>

                <span>›</span>

                <Link to="/cart">
                    Cart
                </Link>

                <span>›</span>

                <span>
                    Checkout
                </span>

            </div>


            <h1>
                Checkout
            </h1>


            <div className="checkout-container">

                <form
                    className="checkout-form"
                    onSubmit={placeOrder}
                >

                    <h2>
                        Billing Details
                    </h2>


                    <div className="two-columns">

                        <input
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />


                    <input
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />


                    <input
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />


                    <div className="two-columns">

                        <input
                            name="city"
                            placeholder="City"
                            value={form.city}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="state"
                            placeholder="State"
                            value={form.state}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <input
                        name="pincode"
                        placeholder="Pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        required
                    />


                    <h2>
                        Payment
                    </h2>


                    <label>
                        <input
                            type="radio"
                            name="payment"
                            defaultChecked
                        />

                        Cash on Delivery
                    </label>


                    <button type="submit">
                        Place Order
                    </button>

                </form>


                <div className="checkout-summary">

                    <h2>
                        Your Order
                    </h2>


                    {cart.map((item) => (

                        <div
                            key={item.id}
                            className="checkout-item"
                        >

                            <span>
                                {item.name}
                                × {item.quantity}
                            </span>

                            <strong>
                                $
                                {(
                                    Number(item.price) *
                                    Number(item.quantity)
                                ).toFixed(2)}
                            </strong>

                        </div>

                    ))}


                    <hr />


                    <div className="checkout-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ${total.toFixed(2)}
                        </strong>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Checkout;