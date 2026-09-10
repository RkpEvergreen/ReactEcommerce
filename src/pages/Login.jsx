import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            login(user, token);

            if (user.role === "admin") {
                navigate("/admin");
                return;
            }

            navigate("/");
        } catch (error) {
            const message = error?.response?.data?.error || "Login failed. Please try again.";
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="customer-login-page">
            <section className="customer-login-card">
                <div className="customer-login-card-inner">
                    <Link className="customer-login-logo" to="/">Logo Here</Link>
                    <p className="customer-login-welcome">Welcome back !!!</p>
                    <h1>Sign in</h1>

                    <form onSubmit={handleSubmit} className="customer-login-form">
                        <label htmlFor="customer-email">Email</label>
                        <input
                            id="customer-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="customer-login-password-label">
                            <label htmlFor="customer-password">Password</label>
                            <Link to="/login">Forgot Password ?</Link>
                        </div>
                        <input
                            id="customer-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "SIGNING IN..." : "SIGN IN"} <span>→</span>
                        </button>
                    </form>

                    <p className="customer-login-signup">
                        I don't have an account ? <Link to="/register">Sign up</Link>
                    </p>
                    <Link className="customer-login-admin-link" to="/admin/login">
                        Administrator login
                    </Link>
                </div>
            </section>

            <section className="customer-login-art" aria-label="Shopping illustration">
                <div className="customer-login-wall-lines" />
                <div className="customer-login-person">
                    <span className="customer-login-head" />
                    <span className="customer-login-body" />
                    <span className="customer-login-leg customer-login-leg-left" />
                    <span className="customer-login-leg customer-login-leg-right" />
                </div>
                <div className="customer-login-cart">
                    <span className="customer-login-cart-wheel cart-wheel-left" />
                    <span className="customer-login-cart-wheel cart-wheel-right" />
                    <span className="customer-login-cart-basket" />
                </div>
                <span className="customer-login-ball" />
            </section>
        </main>
    );
}

export default Login;