const BASE_URL = "http://localhost:5000/api";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function createProduct(product) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
    }),
  });

  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    }),
  });

  return res.json();
}