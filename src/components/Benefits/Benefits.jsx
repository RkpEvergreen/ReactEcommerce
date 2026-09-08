import "./Benefits.css";

const benefits = [
    {
        id: 1,
        icon: "/benefits/savings.png",
        title: "Guaranteed Savings",
        description:
            "If you don’t make your membership fee in savings, we’ll refund the difference",
    },
    {
        id: 2,
        icon: "/benefits/risk-free.png",
        title: "Try it risk-free",
        description:
            "If you don’t make your membership fee in savings, we’ll refund the difference",
    },
    {
        id: 3,
        icon: "/benefits/delivery.png",
        title: "Super Fast Delivery",
        description:
            "If you don’t make your membership fee in savings, we’ll refund the difference",
    },
    {
        id: 4,
        icon: "/benefits/products.png",
        title: "1000+ products priced at cost",
        description:
            "If you don’t make your membership fee in savings, we’ll refund the difference",
    },
];

const Benefits = () => {
    return (
        <section className="benefits-section">
            <div className="benefits-container">
                {benefits.map((benefit) => (
                    <div className="benefit-item" key={benefit.id}>

                        <div className="benefit-icon">
                            <img
                                src={benefit.icon}
                                alt={benefit.title}
                            />
                        </div>

                        <h3>{benefit.title}</h3>

                        <p>{benefit.description}</p>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;