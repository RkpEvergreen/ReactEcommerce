const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const db = require("../config/db");
        const [rows] = await db.query("SELECT * FROM categories ORDER BY name ASC");
        return res.json(rows);
    } catch (error) {
        console.error("Get categories error:", error);
        return res.status(500).json({ error: "Unable to load categories." });
    }
});

module.exports = router;
