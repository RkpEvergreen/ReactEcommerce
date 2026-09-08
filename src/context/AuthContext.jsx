import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        if (typeof window === "undefined") {
            return null;
        }

        const savedUser = localStorage.getItem("ecommerce-user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => {
        if (typeof window === "undefined") {
            return null;
        }

        return localStorage.getItem("ecommerce-token");
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (user) {
                localStorage.setItem("ecommerce-user", JSON.stringify(user));
            } else {
                localStorage.removeItem("ecommerce-user");
            }
        }
    }, [user]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (token) {
                localStorage.setItem("ecommerce-token", token);
            } else {
                localStorage.removeItem("ecommerce-token");
            }
        }
    }, [token]);

    const login = (userData, authToken = null) => {
        const nextUser = userData || null;
        setUser(nextUser);
        setToken(authToken || nextUser?.token || token);
        return nextUser;
    };

    const register = (userData, authToken = null) => {
        const nextUser = userData || null;
        setUser(nextUser);
        setToken(authToken || nextUser?.token || token);
        return nextUser;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const value = useMemo(
        () => ({ user, token, login, register, logout }),
        [user, token]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export default AuthContext;
