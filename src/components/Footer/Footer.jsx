import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faTwitter,
    faFacebookF,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

function Footer() {
    return (
        <footer className="site-footer">

            <div className="footer-container">

                {/* =========================
                    SOCIAL
                ========================== */}
                <div className="footer-column">

                    <h3>Social</h3>

                    <ul>
                        <li>
                            <a href="#" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faInstagram} />
                                <span>Instagram</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTwitter} />
                                <span>Twitter</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} />
                                <span>Facebook</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faYoutube} />
                                <span>Youtube</span>
                            </a>
                        </li>
                    </ul>

                </div>


                {/* =========================
                    CONTACT
                ========================== */}
                <div className="footer-column">

                    <h3>Contact</h3>

                    <ul>
                        <li>
                            <Link to="/contact">
                                Contact Us
                            </Link>
                        </li>

                        <li>
                            <a href="mailto:yourexample@email.com">
                                yourexample@email.com
                            </a>
                        </li>

                        <li>
                            <a href="mailto:example@email.com">
                                example@email.com
                            </a>
                        </li>

                        <li>
                            <a href="tel:+12545685479">
                                Call us: +1 254 568-5479
                            </a>
                        </li>
                    </ul>

                </div>


                {/* =========================
                    ABOUT
                ========================== */}
                <div className="footer-column">

                    <h3>About</h3>

                    <ul>
                        <li>
                            <Link to="/support">
                                Support Center
                            </Link>
                        </li>

                        <li>
                            <Link to="/customer-support">
                                Customer Support
                            </Link>
                        </li>

                        <li>
                            <Link to="/about">
                                About Us
                            </Link>
                        </li>

                        <li>
                            <Link to="/copyright">
                                Copyright
                            </Link>
                        </li>
                    </ul>

                </div>


                {/* =========================
                    CUSTOMER CARE
                ========================== */}
                <div className="footer-column">

                    <h3>Customer Care</h3>

                    <ul>
                        <li>
                            <Link to="/faq">
                                FAQ &amp; Helps
                            </Link>
                        </li>

                        <li>
                            <Link to="/shipping">
                                Shipping &amp; Delivery
                            </Link>
                        </li>

                        <li>
                            <Link to="/returns">
                                Return &amp; Exchanges
                            </Link>
                        </li>
                    </ul>

                </div>


                {/* =========================
                    OUR INFORMATION
                ========================== */}
                <div className="footer-column">

                    <h3>Our Information</h3>

                    <ul>
                        <li>
                            <Link to="/privacy-policy">
                                Privacy policy update
                            </Link>
                        </li>

                        <li>
                            <Link to="/terms">
                                Terms &amp; conditions
                            </Link>
                        </li>

                        <li>
                            <Link to="/return-policy">
                                Return Policy
                            </Link>
                        </li>

                        <li>
                            <Link to="/sitemap">
                                Site Map
                            </Link>
                        </li>
                    </ul>

                </div>


                {/* =========================
                    TOP CATEGORIES
                ========================== */}
                <div className="footer-column">

                    <h3>Top Categories</h3>

                    <ul>
                        <li>
                            <Link to="/products?category=mens-wear">
                                Men's Wear
                            </Link>
                        </li>

                        <li>
                            <Link to="/products?category=mens-wear">
                                Men's Wear
                            </Link>
                        </li>

                        <li>
                            <Link to="/products?category=kids-wear">
                                Kid's Wear
                            </Link>
                        </li>

                        <li>
                            <Link to="/products?category=sports-wear">
                                Sports Wear
                            </Link>
                        </li>
                    </ul>

                </div>

            </div>

        </footer>
    );
}

export default Footer;