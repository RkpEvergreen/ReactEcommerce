import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./AdminLogin.css";

function AdminLogin() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/auth/admin-login", { email, password });
            const { token, user } = response.data;

            login(user, token);
            navigate("/admin", { replace: true });
        } catch (error) {
            const message =
                error?.response?.data?.error ||
                "Administrator login failed. Please try again.";
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-login-page">
            <section className="admin-login-promo">
                <div className="admin-login-promo-content">
                    <div className="admin-login-brand-mark">E<span>+</span></div>
                    <p className="admin-login-eyebrow">ADMINISTRATOR PORTAL</p>
                    <h1>Simplify<br />management with<br />our dashboard.</h1>
                    <p className="admin-login-promo-text">
                    Simplify your e-commerce management with our user-friendly admin dashboard.
                    </p>
                    <div className="admin-login-illustration" aria-hidden="true">
                    <span className="admin-login-figure admin-login-figure-one" />
                    <span className="admin-login-figure admin-login-figure-two" />
                    </div>
                </div>
            </section>

            <section className="admin-login-form-panel">
                <div className="admin-login-form-wrap">
                    <div className="admin-login-logo">
                    <span className="admin-login-logo-icon">E<span>+</span></span>
                    <strong>E Spurt</strong>
                    </div>
                    <h2>Welcome Back</h2>
                    <p className="admin-login-subtitle">Please login to your account</p>

                    <form onSubmit={handleSubmit} className="admin-login-form">
                    <label className="visually-hidden" htmlFor="admin-email">Email Address</label>
                    <input
                        id="admin-email"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <label className="visually-hidden" htmlFor="admin-password">Password</label>
                    <input
                        id="admin-password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <Link className="admin-login-forgot" to="/admin/login">Forgot password?</Link>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    </form>

                    <div className="admin-login-divider"><span>Or Login with</span></div>
                    <div className="admin-login-socials">
                    <button type="button" className="admin-login-social">
                        <span className="admin-login-google">G</span> Google
                    </button>
                    <button type="button" className="admin-login-social">
                        <span className="admin-login-facebook">f</span> Facebook
                    </button>
                    </div>
                    <p className="admin-login-switch">
                    Don't have an account? <Link to="/login">Signup</Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default AdminLogin;
