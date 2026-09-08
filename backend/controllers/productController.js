const db = require("../config/db");

exports.getAllProducts = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT id, category_id, name, slug, description, price,
                    stock_quantity, image_url, is_active
             FROM products
             WHERE is_active = TRUE
             ORDER BY created_at DESC`
        );

        return res.json(rows);
    } catch (error) {
        console.error("Get all products error:", error);
        return res.status(500).json({ error: "Unable to load products." });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            `SELECT id, category_id, name, slug, description, price,
                    stock_quantity, image_url, is_active
             FROM products
             WHERE id = ? AND is_active = TRUE`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.json(rows[0]);
    } catch (error) {
        console.error("Get product by id error:", error);
        return res.status(500).json({ error: "Unable to load product." });
    }
};
