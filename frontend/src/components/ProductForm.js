import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../services/api";
import "../styles/main.css";

export default function ProductForm({
  onProductAdded,
  editingProduct,
  onUpdated
}) {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name || "",
        sku: editingProduct.sku || "",
        category: editingProduct.category || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || ""
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock)
        });

        onUpdated(updated);

        setForm({
          name: "",
          sku: "",
          category: "",
          price: "",
          stock: ""
        });

        return;
      }

      const created = await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });

      onProductAdded(created);

      setForm({
        name: "",
        sku: "",
        category: "",
        price: "",
        stock: ""
      });

    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form-grid">

        <h2 className="section-title">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>

        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
        <input name="sku" placeholder="SKU (e.g. EL-001)" value={form.sku} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />

        <button type="submit" className="submit-btn">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

      </form>
    </div>
  );
}