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
  const userId = LoggedUser?.user_id;

  useEffect(() => {
    if (!LoggedUser || LoggedUser.isAdmin !== 0) {
      navigate("/Auth/login"); // Redirect if not logged in or not an admin
    }
  }, [LoggedUser, navigate]);

  // if (!LoggedUser || LoggedUser.isAdmin !== 0) {
  //   return ; // Prevent rendering if navigating away
  // }

  useEffect(() => {
    if (userId) {
      const fetchCartData = async () => {
        try {
          const response = await axios.get(
            baseurl+`/rim/user/${userId}`
          );
          const items = response.data.cartItems.map((item) => ({
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
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce(
      (total, item) => total + Number(item.mrp_rate || 0) * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleQuantityChange = async (productId, increment) => {
    // Create a new array for updated items with updated quantities and send PUT requests
    const updatedItems = await Promise.all(
      cartItems.map(async (item) => {
        if (item.product_id === productId) {
          const newQuantity = increment
            ? item.quantity + 1
            : Math.max(item.quantity - 1, 1);
  
          try {
            await axios.put(`${baseurl}/rim/update/${item.cart_id}`, { quantity: newQuantity });
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
  
  const handlecheckout = async () => {
    try {
      // Send POST request with user_id to place the order
      await axios.post(baseurl+"/rim/placeOrder", { userId: userId });

      // Navigate to the checkout page upon successful order placement
      navigate("/user/checkout");
    } catch (error) {
      console.error("Error placing order:", error);
      // Optionally, handle error state or display an error message here
    }
    navigate("/user/checkout");
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
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product_id}>
                  <td className="product-details">
                    <img
                      src={baseurl+`/${item.first_image}`}
                      alt={item.name}
                      className="product-images"
                    />
                    <div className="product-info">
                      <p className="product-name">{item.name}</p>
                      <p className="product-category">{item.brand_name}</p>
                    </div>
                  </td>
                  <td className="product-mrp">Rs {Number(item.mrp_rate || 0).toFixed(2)}</td>
                  <td className="quantity-controls">
                    <div className="btnControl">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product_id, false)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.product_id, true)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="total-price">
                    Rs {(Number(item.mrp_rate || 0) * item.quantity).toFixed(2)}
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
