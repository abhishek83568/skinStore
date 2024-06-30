import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchProducts = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get("query");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://skinstore-backend.onrender.com/ProductPage"
        );
        const data = await response.json();

        if (query && query.trim() !== "") {
          const filtered = data.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="product-grid">
      <h1>Search Results for "{query}"</h1>
      <div className="grid-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image_path} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;
