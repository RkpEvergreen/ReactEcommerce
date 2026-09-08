import { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("Please enter your email address.");
            return;
        }

        alert(`Thank you for subscribing: ${email}`);

        setEmail("");
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-container">

                {/* Left Content */}
                <div className="newsletter-content">
                    <h2>
                        Get Expert Tips In Your Inbox
                    </h2>

                    <p>
                        Subscribe to our newsletter and stay updated.
                    </p>
                </div>


                {/* Right Form */}
                <form
                    className="newsletter-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Write your email here"
                        aria-label="Email address"
                    />

                    <button type="submit">
                        Subscribe
                    </button>

                </form>

            </div>
        </section>
    );
}

export default Newsletter;