const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, category_id, name, slug, description, price,
              stock_quantity, image_url
       FROM products
       WHERE is_active = TRUE
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Unable to load products' });
  }
});

module.exports = router;