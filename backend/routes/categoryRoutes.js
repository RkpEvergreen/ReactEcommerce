const express = require("express");
const db = require("../config/db");

const router = express.Router();

function makeSlug(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function categoryFields(body) {
    const name = String(body.name || "").trim();
    const slug = makeSlug(body.slug || name);

    if (!name || !slug) {
        return null;
    }

    return {
        name,
        slug,
        description: String(body.description || "").trim() || null
    };
}

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT c.id, c.name, c.slug, c.description, c.created_at, c.updated_at,
                    COUNT(p.id) AS products
             FROM categories c
             LEFT JOIN products p ON p.category_id = c.id AND p.is_active = TRUE
             GROUP BY c.id
             ORDER BY c.name ASC`
        );
        return res.json(rows);
    } catch (error) {
        console.error("Get categories error:", error);
        return res.status(500).json({ error: "Unable to load categories." });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT id, name, slug, description FROM categories WHERE id = ?",
            [req.params.id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Category not found." });
        }
        return res.json(rows[0]);
    } catch (error) {
        console.error("Get category error:", error);
        return res.status(500).json({ error: "Unable to load category." });
    }
});

router.post("/", async (req, res) => {
    try {
        const fields = categoryFields(req.body);
        if (!fields) {
            return res.status(400).json({ error: "Category name is required." });
        }

        const [result] = await db.query(
            "INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)",
            [fields.name, fields.slug, fields.description]
        );
        return res.status(201).json({ id: result.insertId, ...fields, products: 0 });
    } catch (error) {
        console.error("Create category error:", error);
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Category name or slug already exists." });
        }
        return res.status(500).json({ error: "Unable to create category." });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const fields = categoryFields(req.body);
        if (!fields) {
            return res.status(400).json({ error: "Category name is required." });
        }

        const [result] = await db.query(
            "UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?",
            [fields.name, fields.slug, fields.description, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Category not found." });
        }
        return res.json({ id: Number(req.params.id), ...fields });
    } catch (error) {
        console.error("Update category error:", error);
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Category name or slug already exists." });
        }
        return res.status(500).json({ error: "Unable to update category." });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const [products] = await db.query(
            "SELECT COUNT(*) AS total FROM products WHERE category_id = ? AND is_active = TRUE",
            [req.params.id]
        );
        if (Number(products[0].total) > 0) {
            return res.status(409).json({
                error: "Categories with products cannot be deleted."
            });
        }

        const [result] = await db.query(
            "DELETE FROM categories WHERE id = ?",
            [req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Category not found." });
        }
        return res.json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error("Delete category error:", error);
        return res.status(500).json({ error: "Unable to delete category." });
    }
});

module.exports = router;
