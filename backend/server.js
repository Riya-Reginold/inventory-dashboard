import express from "express";
import cors from "cors";
import pool from "./db/db.js";

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is running");
});


app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET error:", error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


app.post("/api/products", async (req, res) => {
  try {
    const { name, sku, category, price, stock } = req.body;

    const result = await pool.query(
      `INSERT INTO products (name, sku, category, price, stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, sku, category, price, stock]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("POST error:", error.message);
    res.status(500).json({ error: "Failed to create product" });
  }
});


app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, category, price, stock } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name=$1,
           sku=$2,
           category=$3,
           price=$4,
           stock=$5
       WHERE id=$6
       RETURNING *`,
      [name, sku, category, price, stock, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT error:", error.message);
    res.status(500).json({ error: "Failed to update product" });
  }
});


app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("DELETE error:", error.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});