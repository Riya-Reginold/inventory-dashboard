import "../styles/productList.css";

export default function ProductList({ products, onDelete, onEdit }) {
  return (
    <div className="products-section">
      <h2 className="section-title">Products</h2>

      <div className="category-filters">
        <button className="active">All</button>
        <button>Electronics</button>
        <button>Apparel</button>
        <button>Appliances</button>
        <button>Furniture</button>
        <button>Health</button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="product-name">{product.name}</td>
              <td>{product.category}</td>
              <td>{product.sku}</td>
              <td>{product.stock || 0}</td>
              <td>€{product.price}</td>

              <td>
                <span
                  className={
                    (product.stock || 0) > 10
                      ? "status in-stock"
                      : "status low-stock"
                  }
                >
                  {(product.stock || 0) > 10
                    ? "In stock"
                    : "Low stock"}
                </span>
              </td>

              <td>
             
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => onDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}