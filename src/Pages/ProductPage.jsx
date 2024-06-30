import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/action";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const ProductPage = () => {
  const productData = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const addToCart = async (product) => {
    try {
      const cartResponse = await fetch(
        "https://skinstore-backend.onrender.com/Cart"
      );
      const cartData = await cartResponse.json();

      const existingProduct = cartData.find((item) => item.id === product.id);

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

  if (productData.loading) {
    return <div>Loading...</div>;
  }

  if (productData.error) {
    return <div>Error: {productData.error}</div>;
  }

  return (
    <>
      <div className="product-container">
        {productData.data.length > 0 ? (
          productData.data.map((product) => (
            <div key={product.id} className="single-product">
              <div style={{ height: "300px", width: "100%" }}>
                <img src={product.image_path} alt={product.title} />
              </div>
              <div style={{ height: "80px", marginBottom: "10px" }}>
                <h2>{product.title}</h2>
                <p>Price: {product.price}</p>
              </div>
              <div style={{ display: "flex" }}>
                <button
                  className="viewProductButton"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Product
                </button>
                <button
                  className="cartButton"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
