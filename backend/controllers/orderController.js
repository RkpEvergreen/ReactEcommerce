const db = require("../config/db");

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: "User id is required." });
        }

        const [rows] = await db.query(
            "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
            [userId]
        );

        return res.json(rows);
    } catch (error) {
        console.error("Get orders error:", error);
        return res.status(500).json({ error: "Unable to fetch orders." });
    }
};

exports.createOrder = async (req, res) => {
    try {
        const { userId, totalAmount, paymentMethod } = req.body;

        if (!userId || !totalAmount) {
            return res.status(400).json({ error: "User id and total amount are required." });
        }

        const [result] = await db.query(
            "INSERT INTO orders (user_id, status, payment_status, payment_method, subtotal, total_amount) VALUES (?, 'pending', 'pending', ?, ?, ?)",
            [userId, paymentMethod || "cod", totalAmount, totalAmount]
        );

        return res.status(201).json({
            message: "Order created successfully.",
            orderId: result.insertId
        });
    } catch (error) {
        console.error("Create order error:", error);
        return res.status(500).json({ error: "Unable to create order." });
    }
};
