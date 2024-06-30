import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    const response = await fetch(
      `https://skinstore-backend.onrender.com/ProductPage/${id}`
    );
    const item = await response.json();
    setProduct(item);
  };

  const addToCart = async () => {
    try {
      const cartResponse = await fetch(
        "https://skinstore-backend.onrender.com/Cart"
      );
      const cartItems = await cartResponse.json();

      const existingProduct = cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        const updatedProduct = {
          ...existingProduct,
          Qty: existingProduct.Qty + 1,
        };

        await fetch(
          `https://skinstore-backend.onrender.com/Cart/${existingProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );
      } else {
        const newProduct = { ...product, Qty: 1 };

        await fetch("https://skinstore-backend.onrender.com/Cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
      }

      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {product && (
        <div key={product.id} className="single-product-container">
          <div className="image">
            <img src={`.${product.image_path}`} alt="no image" />
          </div>
          <div className="desc">
            <h1>{product.title}</h1>
            <p>{product.price}</p>
          </div>
          <div className="button">
            <button onClick={addToCart}>Add To Cart</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SingleProduct;
