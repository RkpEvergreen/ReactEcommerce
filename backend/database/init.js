const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

const schemaPath = path.join(__dirname, "schema.sql");

async function migrateExistingProducts(connection) {
    const [tables] = await connection.query(
        "SELECT TABLE_NAME FROM information_schema.TABLES " +
        "WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products'"
    );

    if (tables.length === 0) {
        return;
    }

    const [columns] = await connection.query("SHOW COLUMNS FROM products");
    const columnNames = new Set(columns.map((column) => column.Field));

    const idColumn = columns.find((column) => column.Field === "id");
    if (idColumn && !idColumn.Type.includes("unsigned")) {
        await connection.query(
            "ALTER TABLE products MODIFY id INT UNSIGNED NOT NULL AUTO_INCREMENT"
        );
    }

    if (!columnNames.has("category_id")) {
        await connection.query(
            "ALTER TABLE products ADD category_id INT UNSIGNED NULL AFTER id"
        );
    }

    if (!columnNames.has("slug")) {
        await connection.query(
            "ALTER TABLE products ADD slug VARCHAR(220) NULL AFTER name"
        );
        await connection.query(
            "UPDATE products SET slug = CONCAT('product-', id) WHERE slug IS NULL"
        );
        await connection.query(
            "ALTER TABLE products MODIFY slug VARCHAR(220) NOT NULL"
        );
        await connection.query(
            "ALTER TABLE products ADD UNIQUE KEY uq_products_slug (slug)"
        );
    }

    if (!columnNames.has("stock_quantity")) {
        await connection.query(
            "ALTER TABLE products ADD stock_quantity INT UNSIGNED NOT NULL DEFAULT 0"
        );
    }

    if (!columnNames.has("sale_price")) {
        await connection.query(
            "ALTER TABLE products ADD sale_price DECIMAL(10, 2) NULL AFTER price"
        );
    }

    if (!columnNames.has("image_url")) {
        await connection.query(
            "ALTER TABLE products ADD image_url VARCHAR(500) NULL"
        );
        if (columnNames.has("image")) {
            await connection.query(
                "UPDATE products SET image_url = image WHERE image_url IS NULL"
            );
        }
    }

    if (!columnNames.has("is_active")) {
        await connection.query(
            "ALTER TABLE products ADD is_active BOOLEAN NOT NULL DEFAULT TRUE"
        );
    }

    if (!columnNames.has("updated_at")) {
        await connection.query(
            "ALTER TABLE products ADD updated_at TIMESTAMP NOT NULL " +
            "DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        );
    }
}

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        multipleStatements: true
    });

    try {
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` ` +
            "CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
        );
        await connection.query(`USE \`${process.env.DB_NAME}\``);
        await migrateExistingProducts(connection);
        const schema = fs.readFileSync(schemaPath, "utf8");
        await connection.query(schema);
        console.log(`Database schema initialized in ${process.env.DB_NAME}.`);
    } finally {
        await connection.end();
    }
}

initializeDatabase().catch((error) => {
    console.error("Database schema initialization failed:", error.message);
    process.exitCode = 1;
});
