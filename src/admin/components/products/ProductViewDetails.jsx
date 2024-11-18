import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Package, ShoppingCart } from 'lucide-react';
import '../products/ProductViewDetails.css';
import defaultImage from '../../assets/compressor-img.png';
import baseurl from '../../../apiService/apiService';

const ProductViewDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(defaultImage);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/productDetail/${id}`);
        const fetchedProduct = response.data;

        // Extract image paths from the image array
        if (fetchedProduct.image && Array.isArray(fetchedProduct.image)) {
          fetchedProduct.image = fetchedProduct.image.map((img) => img.image_path);
          setMainImage(`${baseurl}/${fetchedProduct.image[0]}`); // Set the first image as the main image
        }

        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="productDetailsContainer" style={{ width: '80%' }}>
      <section className="section-1">
        <div className="productImageSection">
          {/* Main Image */}
          <img src={mainImage} alt="Main Product" className="mainImage" />

          {/* Thumbnail Gallery */}
          <div className="thumbnailGallery">
            {product.image && product.image.length > 0 ? (
              product.image.map((img, index) => (
                <img
                  key={index}
                  src={`${baseurl}/${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail"
                  onClick={() => setMainImage(`${baseurl}/${img}`)}
                />
              ))
            ) : (
              <img src={defaultImage} alt="Default Thumbnail" className="thumbnail" />
            )}
          </div>
        </div>

        {/* Product Stats */}
        <div className="productStatsSection">
          <div className="stockInfo">
            <strong><Package style={{ border: '1.5px solid #091975', color: '#091975' }} /> Stock</strong>
            <p>{product.stocks} / Pack</p>
          </div>
          <div className="salesInfo">
            <strong><ShoppingCart style={{ border: '1.5px solid #F4A754', color: '#F4A754' }} /> Sales</strong>
            <p>{product.sales} / Pack</p>
          </div>
        </div>
      </section>

      <section className="section-2">
        {/* Product Information */}
        <div className="productInfoSection">
          <h2>{product.name}</h2>
          <h3 className="productPrice">Rs {product.mrp_rate}</h3>
          <p><strong>ID Product:</strong> {product.product_id}</p>

          {/* About Product */}
          <div className="aboutProduct">
            <h4>About Product</h4>
            <p>{product.product_description}</p>
          </div>

          {/* Additional Information */}
          <div className="additionalInfo">
            <h4>Additional Information</h4>
            <p><strong>Item Details:</strong> {product.item_details}</p>
            <p><strong>How to Use:</strong> {product.how_to_use}</p>
            <p><strong>Composition:</strong> {product.composision}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductViewDetails;
