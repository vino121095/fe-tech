import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import '../products/OrderSummary.css';
import { Box, Upload } from 'lucide-react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import baseurl from '../../../apiService/apiService';

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Track expanded order

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseurl}/rim/orders`);
        console.log(response.data); // Log the response to check the structure
        setOrders(response.data || []); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Only slice if orders array is not empty
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.length ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  // Toggle function to expand or collapse order items
  const toggleOrderItems = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div>
      {/* Search and Add Order Section */}
      <div className="searches">
        <div className="searchInputs" id="searchBox">
          <input type="text" className="search-input" placeholder="Search Order" />
          <div className="searchIcons">
            <i className="bi bi-search" style={{ color: '#808080' }}></i>
          </div>
        </div>
      </div>

      <div className='orderDetails'>
        <ul>
            <a href=""><li>All Orders</li></a>
            <a href=""><li>Received</li></a>
            <a href=""><li>Shipping</li></a>
            <a href=""><li>Complaint</li></a>
            <a href=""><li>Canceled</li></a>
            <a href=""><li>Done</li></a>
        </ul>
      </div>
 
      {/* Orders Table */}
      <table className="products-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order, index) => (
              <React.Fragment key={order.order_id}>
                <tr onClick={() => toggleOrderItems(order.order_id)}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="product-icon">
                        <Box color="white" size={20} />
                      </div>
                      {order.order_id}
                    </div>
                  </td>
                  <td>{order.username}</td>
                  <td>{order.order_date}</td>
                  <td>{order.total_amount}</td>
                  <td>{order.status}</td>
                </tr>
                
                {/* Render order items if this order is expanded */}
                {expandedOrderId === order.order_id && (
                  <tr className="order-items-row">
                    <td colSpan="6">
                      <div className="order-items">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <img
                              src={`${baseurl}/${item.firstImage}`}
                              alt={item.product_name}
                              className="item-image"
                            />
                            <p className="item-name">{item.product_name}</p>
                            <p className="item-category">Quantity: {item.quantity}</p>
                            <p className="item-price">Price: {item.price}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
         
      {/* Pagination UI */}
      <div className="container d-flex mt-2" style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <div className="results-count text-center mb-3">
          Showing {currentOrders.length === 0 ? '0' : '1'} to {currentOrders.length} of {orders.length} entries
        </div>

        <Pagination className="justify-content-center" style={{gap:'10px'}}>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <MdChevronLeft />
          </Pagination.Prev>

          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdChevronRight />
          </Pagination.Next>
        </Pagination>
        <div></div>
      </div>
    </div>
  );
};

export default OrderSummary;
