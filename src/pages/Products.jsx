import { useEffect, useState } from "react";
import api from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to connect to the API. Start XAMPP MySQL and the backend server, then try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="products-page">
      <h1>Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p>No products found. Add products to the products table in phpMyAdmin.</p>
      )}
      {!loading && !error && products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong>
              <span>{product.description || "No description available."}</span>
              <b>INR {Number(product.price).toFixed(2)}</b>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Products;