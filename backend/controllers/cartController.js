const db = require("../config/db");

exports.getCart = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: "User id is required." });
        }

        const [rows] = await db.query(
            `SELECT ci.*, p.name, p.price, p.image_url
             FROM cart_items ci
             JOIN products p ON p.id = ci.product_id
             WHERE ci.cart_id = (
                 SELECT id FROM cart WHERE user_id = ?
             )`,
            [userId]
        );

        return res.json(rows);
    } catch (error) {
        console.error("Get cart error:", error);
        return res.status(500).json({ error: "Unable to fetch cart." });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity = 1 } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ error: "User id and product id are required." });
        }

        const [cartRows] = await db.query("SELECT id FROM cart WHERE user_id = ?", [userId]);

        let cartId;

        if (cartRows.length === 0) {
            const [result] = await db.query("INSERT INTO cart (user_id) VALUES (?)", [userId]);
            cartId = result.insertId;
        } else {
            cartId = cartRows[0].id;
        }

        const [existing] = await db.query(
            "SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ?",
            [cartId, productId]
        );

        if (existing.length > 0) {
            const newQuantity = existing[0].quantity + Number(quantity);
            await db.query(
                "UPDATE cart_items SET quantity = ? WHERE id = ?",
                [newQuantity, existing[0].id]
            );
        } else {
            await db.query(
                "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
                [cartId, productId, quantity]
            );
        }

        return res.status(201).json({ message: "Item added to cart." });
    } catch (error) {
        console.error("Add cart item error:", error);
        return res.status(500).json({ error: "Unable to add item to cart." });
    }
};
