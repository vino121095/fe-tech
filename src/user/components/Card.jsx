import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import axios from 'axios';
import baseurl from '../../apiService/apiService';

const Card = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();
  const LoggedUser = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/getAllProducts`);
        console.log('Fetched products:', response.data.products); // Debugging log
        setProducts(response.data.products || []); // Fallback to empty array if data is undefined
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Ensure `products` remains an empty array on error
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCard = async (product) => {
    if (LoggedUser) {
      try {
        // API call to add product to cart
        await axios.post(`${baseurl}/api/addtocart`, {
          productId: product.product_id,
          userId: LoggedUser.user_id,
          quantity: 1,
        });

        // Update the cart state if needed
        setCartItems((prevItems) => [...prevItems, product]);

        // Redirect the user to the "Cart" page
        navigate('/user/pages/Cart');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      alert('Please login to add products to cart.');
      navigate('/Auth/Login');
    }
  };

  return (
    <div className="card-container">
      {products && products.length > 0 ? ( // Ensure `products` is defined and not empty
        products.map((product) => (
          <div className="card" key={product.product_id}>
            <img src={`${baseurl}/${product.first_image}`} alt={product.name} />
            <p>{product.name}</p>
            <span></span>
            <h4>Rs-{product.mrp_rate}</h4>
            <small className="brand">{product.brand_name}</small>
            <button className="cardBtn" onClick={() => handleAddToCard(product)}>
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p>No products available</p> // Display a fallback message if no products exist
      )}
    </div>
  );
};

export default Card;
