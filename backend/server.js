const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "E-commerce API is running"
    });
});


app.get("/api/test-db", async (req, res) => {

    try {

        const [rows] = await db.query("SELECT 1 AS result");

        res.json({
            success: true,
            message: "MySQL connected successfully",
            data: rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });

    }

});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await db.query("SELECT 1");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to MySQL. Is XAMPP MySQL running?", error.message);
        process.exitCode = 1;
    }
}

startServer();