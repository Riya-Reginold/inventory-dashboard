const express = require("express");
const router = express.Router();
const pool = require("../db/db");


// =========================
// GET ALL PRODUCTS
// =========================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});


// =========================
// GET PRODUCT BY ID
// =========================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});


// =========================
// CREATE PRODUCT
// =========================
router.post("/", async (req, res) => {
  try {
    const {
      name,
      sku,
      category,
      price,
      stock,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO products
      (name, sku, category, price, stock)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        name,
        sku,
        category,
        price,
        stock,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});


// =========================
// UPDATE PRODUCT
// =========================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      sku,
      category,
      price,
      stock,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE products
      SET
        name = $1,
        sku = $2,
        category = $3,
        price = $4,
        stock = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        name,
        sku,
        category,
        price,
        stock,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});


// =========================
// DELETE PRODUCT
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;