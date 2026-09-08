import "./ShopInstagram.css";

const instagramImages = [
    {
        id: 1,
        image: "/instagram/instagram-1.jpg",
        alt: "Fashion collection",
    },
    {
        id: 2,
        image: "/instagram/instagram-2.jpg",
        alt: "Fashion fabric",
    },
    {
        id: 3,
        image: "/instagram/instagram-3.jpg",
        alt: "Women's fashion",
    },
    {
        id: 4,
        image: "/instagram/instagram-4.jpg",
        alt: "Fashion accessories",
    },
    {
        id: 5,
        image: "/instagram/instagram-5.jpg",
        alt: "Women's clothing",
    },
];

function ShopInstagram() {
    return (
        <section className="shop-instagram">
            <div className="shop-instagram-container">

                {/* Heading */}
                <div className="instagram-heading">
                    <h2>Shop Instagram</h2>

                    <p>
                        Elevate your wardrobe with fresh finds today!
                    </p>
                </div>


                {/* Images */}
                <div className="instagram-grid">

                    {instagramImages.map((item) => (
                        <a
                            href="#"
                            className="instagram-item"
                            key={item.id}
                        >
                            <img
                                src={item.image}
                                alt={item.alt}
                            />
                        </a>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default ShopInstagram;