const db = require("../config/db");

function productFields(body) {
    const price = Number(body.price);
    const salePrice = body.sale_price === "" || body.sale_price == null
        ? null
        : Number(body.sale_price);
    const stock = Number(body.stock);

    if (!body.name || !Number.isFinite(price) || price < 0 ||
        (salePrice !== null && (!Number.isFinite(salePrice) || salePrice < 0 || salePrice > price)) ||
        !Number.isInteger(stock) || stock < 0 ||
        !Number.isInteger(Number(body.category_id)) || Number(body.category_id) < 1) {
        return null;
    }

    return {
        name: body.name.trim(),
        description: body.description || null,
        price,
        salePrice,
        stock,
        categoryId: Number(body.category_id)
    };
}

async function getProductQuery(id) {
    const whereClause = id == null
        ? "WHERE p.is_active = TRUE ORDER BY p.created_at DESC"
        : "WHERE p.id = ? AND p.is_active = TRUE";
    const [rows] = await db.query(
        `SELECT p.id, p.category_id, c.name AS category, p.name, p.slug,
                p.description, p.price, p.sale_price, p.stock_quantity,
                p.stock_quantity AS stock, p.image_url, p.image_url AS image,
                p.is_active
         FROM products p
         LEFT JOIN categories c ON c.id = p.category_id
         ${whereClause}`,
        id == null ? [] : [id]
    );
    return rows;
}

exports.getAllProducts = async (req, res) => {
    try {
        return res.json(await getProductQuery(null));
    } catch (error) {
        console.error("Get all products error:", error);
        return res.status(500).json({ error: "Unable to load products." });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const rows = await getProductQuery(req.params.id);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Product not found." });
        }
        return res.json(rows[0]);
    } catch (error) {
        console.error("Get product by id error:", error);
        return res.status(500).json({ error: "Unable to load product." });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const fields = productFields(req.body);
        if (!fields) {
            return res.status(400).json({ error: "Please provide valid product details." });
        }

        const slug = `${fields.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}`;
        const image = req.file ? req.file.filename : null;
        const [result] = await db.query(
            `INSERT INTO products
                (category_id, name, slug, description, price, sale_price, stock_quantity, image_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [fields.categoryId, fields.name, slug, fields.description, fields.price,
                fields.salePrice, fields.stock, image]
        );

        const rows = await getProductQuery(result.insertId);
        return res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({ error: "Unable to create product." });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const fields = productFields(req.body);
        if (!fields) {
            return res.status(400).json({ error: "Please provide valid product details." });
        }

        const imageClause = req.file ? ", image_url = ?" : "";
        const values = [
            fields.categoryId, fields.name, fields.description, fields.price,
            fields.salePrice, fields.stock
        ];
        if (req.file) {
            values.push(req.file.filename);
        }
        values.push(req.params.id);

        const [result] = await db.query(
            `UPDATE products
             SET category_id = ?, name = ?, description = ?, price = ?,
                 sale_price = ?, stock_quantity = ?${imageClause}
             WHERE id = ? AND is_active = TRUE`,
            values
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found." });
        }

        const rows = await getProductQuery(req.params.id);
        return res.json(rows[0]);
    } catch (error) {
        console.error("Update product error:", error);
        return res.status(500).json({ error: "Unable to update product." });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const [result] = await db.query(
            "UPDATE products SET is_active = FALSE WHERE id = ? AND is_active = TRUE",
            [req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found." });
        }
        return res.json({ message: "Product deleted successfully." });
    } catch (error) {
        console.error("Delete product error:", error);
        return res.status(500).json({ error: "Unable to delete product." });
    }
};
