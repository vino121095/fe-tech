import React, { useState, useEffect } from "react";
import "../pages/OrderHistory.css";
import NavBar from "../components/NavBar";
import axios from "axios";
import baseurl from "../../apiService/apiService";

const OrderHistory = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { uid } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/userOrdersById/${uid}`);
        setOrders(response.data.data);
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
                <th>Total Quantity</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                // Calculate total quantity for the order
                const totalQuantity = order.OrderItems.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                return (
                  <React.Fragment key={order.oid}>
                    <tr
                      onClick={() => toggleOrderItems(order.oid)}
                      className="order-row"
                    >
                      <td>{index + 1}</td>
                      <td>{order.order_id}</td>
                      <td>{totalQuantity}</td>
                      <td>{order.order_date}</td>
                      <td>{order.total_amount}</td>
                    </tr>
                    {expandedOrderId === order.oid && (
                      <tr className="order-items-row">
                        <td colSpan="5">
                          <div className="order-items">
                            {order.OrderItems.map((item, idx) => (
                              <div key={idx} className="order-item">
                                <div>
                                  <p className="item-name">
                                    {item.Product.product_name}
                                  </p>
                                  <p className="item-category">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                                <div>
                                  <p className="item-price">
                                    Price: {item.price}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
