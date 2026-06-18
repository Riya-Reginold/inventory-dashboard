import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct
} from "./services/api";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Sidebar";

import "./styles/main.css";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

 
  const handleProductAdded = (product) => {
    setProducts((prev) => [product, ...prev]);
  };


  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

 
  const handleEdit = (product) => {
    setEditingProduct(product);
  };


  const handleUpdate = async (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );

    setEditingProduct(null);
  };

  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">

        {/* HEADER */}
        <div className="header">
          <p>Inventory and product management system</p>
        </div>

        {/* DASHBOARD */}
       <div className="dashboard-cards">

  <div className="dashboard-card">
    <h2>{products.length}</h2>
    <p>Total Products</p>
  </div>

  <div className="dashboard-card">
    <h2>
      {products.reduce(
        (sum, p) => sum + Number(p.stock ?? 0),
        0
      )}
    </h2>
    <p>Total Units</p>
  </div>

  <div className="dashboard-card">
    <h2>
      {products.filter(
        (p) => Number(p.stock ?? 0) <= 10
      ).length}
    </h2>
    <p>Low Stock</p>
  </div>

  <div className="dashboard-card">
    <h2>
      €
      {products
        .reduce(
          (sum, p) =>
            sum +
            Number(p.price ?? 0) *
            Number(p.stock ?? 0),
          0
        )
        .toFixed(2)}
    </h2>
    <p>Stock Value</p>
  </div>

</div>

        {/* FORM */}
        <div className="card">
          <ProductForm
            onProductAdded={handleProductAdded}
            editingProduct={editingProduct}
            onUpdated={handleUpdate}
          />
        </div>

        {/* TABLE */}
        <div className="card">
          <ProductList
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>

      </main>
    </div>
  );
}

export default App;