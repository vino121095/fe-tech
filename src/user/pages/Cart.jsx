import React, { useEffect, useState } from "react";
import "../pages/Cart.css";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseurl from "../../apiService/apiService";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const LoggedUser = JSON.parse(localStorage.getItem("userData"));
  const userId = LoggedUser?.uid;

  useEffect(() => {
    if (!LoggedUser || LoggedUser.role !== 'user') {
      navigate("/Auth/login");
    }
  }, [LoggedUser, navigate]);

  useEffect(() => {
    if (userId) {
      const fetchCartData = async () => {
        try {
          const response = await axios.get(baseurl + `/api/user/${userId}`);
          const items = response.data.map((item) => ({
            ...item,
          }));
          setCartItems(items);
          calculateTotal(items);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };
      fetchCartData();
    }
  }, [userId]);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (total, item) => total + Number(item.product.mrp_rate || 0) * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleQuantityChange = async (cartId, increment) => {
    const updatedItems = await Promise.all(
      cartItems.map(async (item) => {
        if (item.cid === cartId) {
          const newQuantity = increment
            ? item.quantity + 1
            : Math.max(item.quantity - 1, 1);

          try {
            await axios.put(`${baseurl}/api/update/${item.cid}`, { quantity: newQuantity });
          } catch (error) {
            alert(`Error updating quantity for ${item.product_id}: ${error.message}`);
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );

    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleRemoveItem = async (cartId) => {
    try {
      // Use the new API to remove the cart item
      await axios.delete(`${baseurl}/api/remove/${cartId}`);
      
      // Filter out the removed item from the local state
      const updatedItems = cartItems.filter((item) => item.cid !== cartId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      alert(`Error removing item from cart: ${error.message}`);
    }
  };
  

  const handlecheckout = async () => {
    try {
      await axios.post(baseurl + "/api/placeOrder", { user_id: userId });
      navigate("/user/checkout");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="cart-container">
        <div className="cart-content">
          <h2 className="carItems">Your Cart: {cartItems.length} items</h2>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product Details</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.cid}>
                  <td className="product-details">
                    <img
                      src={baseurl + `/${item.product.images[0].image_path}`}
                      alt={item.name}
                      className="product-images"
                    />
                    <div className="product-info">
                      <p className="product-name">{item.product.product_name}</p>
                      <p className="product-category">{item.product.brand_name}</p>
                    </div>
                  </td>
                  <td className="product-mrp">Rs {Number(item.product.mrp_rate || 0).toFixed(2)}</td>
                  <td className="quantity-controls">
                    <div className="btnControl">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.cid, false)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.cid, true)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="total-price">
                    Rs {(Number(item.product.mrp_rate || 0) * item.quantity).toFixed(2)}
                  </td>
                  <td className="actions">
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveItem(item.cid)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>
            Sub total <span>{cartItems.length} items</span>
          </p>
          <p>
            Total MRP <span>Rs {totalAmount.toFixed(2)}</span>
          </p>
          <h4>
            Total Amount{" "}
            <span className="total-amount">Rs {totalAmount.toFixed(2)}</span>
          </h4>
          <button className="checkout-button" onClick={handlecheckout}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
