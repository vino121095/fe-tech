import React, { useState, useEffect } from "react";
import '../pages/OrderHistory.css'
import NavBar from "../components/NavBar";
import outdoorStand from "../assets/ac-outdoor-stand.png";
import axios from "axios";
import baseurl from "../../apiService/apiService";
import { json } from "react-router-dom";

const OrderHistory = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const {user_id} = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseurl}/rim/userOrdersById/${user_id}`);
        
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); 

  const toggleOrderItems = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="order-history">
          <h2>Order History</h2>
          <p>Loading orders...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="order-history">
          <h2>Order History</h2>
          <p className="error-message">Error: {error}</p>
          <p>Please try again later.</p>
        </div>
      </>
    );
  }

  return (
    <>
     <NavBar />
     <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order ID</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order.order_id}>
                <tr onClick={() => toggleOrderItems(order.order_id)} className="order-row">
                  <td>{index+1}</td>
                  <td>{order.order_id}</td>
                  <td>{order.quantity}</td>
                  <td>{order.order_date}</td>
                  <td>{order.total_amount}</td>
                </tr>
                {expandedOrderId === order.order_id && (
                  <tr className="order-items-row">
                    <td colSpan="5">
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <div>
                              <img src={baseurl+'/'+item.firstImage} alt={item.product_name} className="item-image" />
                              <p className="item-name">{item.product_name}</p>
                              <p className="item-category">{item.quantity}</p>
                            </div>
                            <td><p className="item-quantity">{item.quantity}</p></td>
                            <td><p className="item-date">{order.order_date}</p></td>
                            <td><p className="item-price">{item.price}</p></td>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default OrderHistory;