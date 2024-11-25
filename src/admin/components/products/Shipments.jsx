import React from "react";
import "./Shipments.css";

const Shipments = () => {
  // Data for the shipment analysis chart
  const chartData = [
    { month: "Jan", orders: 20 },
    { month: "Feb", orders: 25 },
    { month: "Mar", orders: 30 },
    { month: "Apr", orders: 22 },
    { month: "May", orders: 28 },
    { month: "Jun", orders: 18 },
    { month: "Jul", orders: 24 },
    { month: "Aug", orders: 35 },
    { month: "Sep", orders: 30 },
    { month: "Oct", orders: 27 },
    { month: "Nov", orders: 22 },
    { month: "Dec", orders: 26 },
  ];

  const maxOrders = Math.max(...chartData.map((data) => data.orders));

  // Data for the shipment list table
  const shipments = [
    {
      id: 1,
      product: "AC Spares",
      org: "Tools Marts",
      date: "Nov 27, 2024",
      destination: "Coimbatore - Kerala",
    },
    {
      id: 2,
      product: "AC Spares",
      org: "Tools Marts",
      date: "Nov 27, 2024",
      destination: "Coimbatore - Kerala",
    },
    {
      id: 3,
      product: "AC Spares",
      org: "Tools Marts",
      date: "Nov 27, 2024",
      destination: "Coimbatore - Kerala",
    },
    {
      id: 4,
      product: "AC Spares",
      org: "Tools Marts",
      date: "Nov 27, 2024",
      destination: "Coimbatore - Kerala",
    },
  ];

  return (
    <div className="shipment-container">
      {/* Shipment Analysis Section */}
      <div className="shipment-analysis">
        <div className="chart">
          <h2>Shipment Analysis</h2>
          <div className="bar-chart">
            {chartData.map((data, index) => (
              <div key={index} className="bar-container">
                <div
                  className={`bar ${data.orders === maxOrders ? "active" : ""}`}
                  style={{ height: `${data.orders * 3}px` }}
                >
                  {data.orders === maxOrders && (
                    <span className="label">Order {data.orders}</span>
                  )}
                </div>
                <span className="month-label">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="statistics">
          <div className="stat-card">
            <h3>Total Delivery</h3>
            <p>40,689</p>
          </div>
          <div className="stat-card">
            <h3>On Delivery</h3>
            <p>10,293</p>
          </div>
          <div className="stat-card">
            <h3>Total Pending</h3>
            <p>2,040</p>
          </div>
        </div>
      </div>

      {/* Shipment List Section */}
      <div className="shipment-list">
        <h2>Shipping List</h2>
        <input
          type="text"
          placeholder="Search Shipping list"
          className="search-input"
        />
        <div className="shipment-list-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Organization Name</th>
                <th>Date</th>
                <th>Destination</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.product}</td>
                  <td>{item.org}</td>
                  <td>{item.date}</td>
                  <td>{item.destination}</td>
                  <td>
                    <button className="btn btn-success">Shipment</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shipments;
