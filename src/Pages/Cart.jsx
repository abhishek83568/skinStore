import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("https://skinstore-backend.onrender.com/Cart");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeItem = async (id) => {
    await fetch(`https://skinstore-backend.onrender.com/Cart/${id}`, {
      method: "DELETE",
    });
    setData(data.filter((item) => item.id !== id));
  
  };

  const handleQuantityChange = async (id, newQuantity) => {
    const item = data.find((item) => item.id === id);
    if (!item || newQuantity < 1) return; // Ensure new quantity is valid

    const updatedItem = { ...item, Qty: newQuantity };

    await fetch(`https://skinstore-backend.onrender.com/Cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    setData(data.map((item) => (item.id === id ? updatedItem : item)));
  };

  const calculateTotal = () => {
    return data
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.replace("$", "")) * item.Qty,
        0
      )
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      {data.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image_path}
                    alt={item.title}
                    className="cart-item-image"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    type="number"
                    value={item.Qty}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="quantity-input"
                  />
                </td>
                <td>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {data.length > 0 && (
        <div className="total">
          <h2>Total: ${calculateTotal()}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
