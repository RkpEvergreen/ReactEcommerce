import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./DealOfTheDay.css";

import image1 from "../../assets/deals/shirt.jpg";
import image2 from "../../assets/deals/watch.jpg";
import image3 from "../../assets/deals/bag.jpg";
import image4 from "../../assets/deals/top.jpg";

// Replace these URLs with your actual product images later.
// For now you can put the images inside public/deals/

const deals = [
    {
        id: 1,
        name: "Unique Latest Women Solid Round Neck Cotton Shirt",
        image: image1,
        discount: "-6%",
        oldPrice: 18,
        price: 17,
        rating: 4,
        countdown: true,
    },
    {
        id: 2,
        name: "MVMT Chrono Analog Gray Dial Men Watch",
        image: image2,
        discount: "-4%",
        oldPrice: 28,
        price: 27,
        rating: 5,
        countdown: true,
    },
    {
        id: 3,
        name: "Lizoleor Slip On Block Sandal Women Pointed Toe Bag",
        image: image3,
        discount: "-3%",
        oldPrice: 29,
        price: 28,
        rating: 4,
        countdown: false,
    },
    {
        id: 4,
        name: "New Classynnest Purple Floral Peplum Top",
        image: image4,
        discount: "-4%",
        oldPrice: 26,
        price: 25,
        rating: 4,
        countdown: false,
    },
];


function DealOfTheDay() {

    const [timeLeft, setTimeLeft] = useState({
        days: 344,
        hours: 3,
        minutes: 7,
        seconds: 44,
    });


    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft((previous) => {

                let {
                    days,
                    hours,
                    minutes,
                    seconds,
                } = previous;


                if (seconds > 0) {
                    seconds--;
                } else {

                    seconds = 59;

                    if (minutes > 0) {
                        minutes--;
                    } else {

                        minutes = 59;

                        if (hours > 0) {
                            hours--;
                        } else {

                            hours = 23;

                            if (days > 0) {
                                days--;
                            }

                        }
                    }
                }


                return {
                    days,
                    hours,
                    minutes,
                    seconds,
                };

            });

        }, 1000);


        return () => clearInterval(timer);

    }, []);


    const formatNumber = (number) => {
        return String(number).padStart(2, "0");
    };


    return (
        <section className="deal-section">

            <div className="deal-container">

                {/* ==================================
                    SECTION HEADER
                ================================== */}

                <div className="deal-header">

                    <h2>
                        Deal Of The Days
                    </h2>


                    <div className="deal-countdown">

                        <span className="deal-countdown-label">
                            Hurry up! offers end in:
                        </span>


                        <div className="countdown-box">
                            {timeLeft.days}
                        </div>

                        <span className="countdown-separator">
                            •
                        </span>


                        <div className="countdown-box">
                            {formatNumber(timeLeft.hours)}
                        </div>

                        <span className="countdown-separator">
                            •
                        </span>


                        <div className="countdown-box">
                            {formatNumber(timeLeft.minutes)}
                        </div>

                        <span className="countdown-separator">
                            •
                        </span>


                        <div className="countdown-box">
                            {formatNumber(timeLeft.seconds)}
                        </div>

                    </div>

                </div>


                {/* ==================================
                    PRODUCTS
                ================================== */}

                <div className="deal-grid">

                    {deals.map((product) => (

                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="deal-product"
                        >

                            {/* IMAGE */}

                            <div className="deal-image-wrapper">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="deal-image"
                                />


                                {/* DISCOUNT */}

                                <span className="deal-discount">
                                    {product.discount}
                                </span>


                                {/* PRODUCT COUNTDOWN */}

                                {product.countdown && (

                                    <div className="product-countdown">

                                        <strong>
                                            {product.id === 1
                                                ? "224d"
                                                : "403d"
                                            }
                                        </strong>

                                        <span>:</span>

                                        <strong>
                                            17h
                                        </strong>

                                        <span>:</span>

                                        <strong>
                                            17m
                                        </strong>

                                        <span>:</span>

                                        <strong>
                                            42s
                                        </strong>

                                    </div>

                                )}

                            </div>


                            {/* PRODUCT NAME */}

                            <h3 className="deal-product-name">
                                {product.name}
                            </h3>


                            {/* RATING */}

                            <div className="deal-rating">

                                {Array.from(
                                    { length: 5 },
                                    (_, index) => (

                                        <span
                                            key={index}
                                            className={
                                                index < product.rating
                                                    ? "star active"
                                                    : "star"
                                            }
                                        >
                                            ★
                                        </span>

                                    )
                                )}

                            </div>


                            {/* PRICE */}

                            <div className="deal-price">

                                <span className="deal-old-price">
                                    ${product.oldPrice}
                                </span>

                                <span className="deal-current-price">
                                    ${product.price}
                                </span>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default DealOfTheDay;