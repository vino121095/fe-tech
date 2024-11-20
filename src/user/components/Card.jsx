import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import axios from 'axios';
import baseurl from '../../apiService/apiService';

const Card = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const LoggedUser = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/getAllProducts`);
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (LoggedUser) {
      try {
        const response = await axios.post(`${baseurl}/api/addtocart`, {
          product_id: product.product_id,
          user_id: LoggedUser.uid,
          quantity: 1,
        });

        alert('Product added to cart successfully!');
        navigate('/user/pages/Cart'); // Navigate to Cart page
      } catch (error) {
        console.error('Error adding product to cart:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Failed to add product to cart.');
      }
    } else {
      alert('Please login to add products to cart.');
      navigate('/Auth/Login'); // Redirect to Login page
    }
  };

  return (
    <div className="card-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="card" key={product.pid}>
            <img
              src={`${baseurl}/${product.images[0]?.image_path || 'default.jpg'}`}
              alt={product.product_name}
            />
            <p>{product.product_name}</p>
            <span></span>
            <h4>Rs-{product.mrp_rate}</h4>
            <small className="brand">{product.brand_name}</small>
            <button className="cardBtn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Card;
