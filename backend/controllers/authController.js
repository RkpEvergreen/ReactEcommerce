const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const createToken = (user) =>
    jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "dev-secret",
        { expiresIn: "7d" }
    );

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const [existingUsers] = await db.query("SELECT id FROM users WHERE email = ?", [email]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: "User already exists." });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [name, email, passwordHash]
        );

        const user = { id: result.insertId, name, email, role: "customer" };

        return res.status(201).json({
            message: "User registered successfully.",
            token: createToken(user),
            user
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ error: "Unable to register user." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        return res.json({
            message: "Login successful.",
            token: createToken(safeUser),
            user: safeUser
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Unable to login." });
    }
};
