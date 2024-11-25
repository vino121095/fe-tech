import React, { useState, useEffect } from "react";
import compressor from "../../assets/compressor-img.png";
import baseurl from "../../../apiService/apiService";
import axios from "axios";

// FeedCard component
const FeedCard = ({ imagePath, productName, quantity, postedBy, location, closeDate }) => (
  <div className="FeedCard col-md-5 mb-4">
    <img
      src={imagePath}
      alt={productName}
      onError={(e) => {
        e.target.src = compressor; // Default image on error
      }}
      style={{ height: "100px" }}
    />
    <div className="info">
      <p className="info-item">
        <span className="label">Product Name:</span>
        <span className="value">{productName}</span>
      </p>
      <p className="info-item">
        <span className="label">Needed Quantity:</span>
        <span className="value">{quantity}</span>
      </p>
      <p className="info-item">
        <span className="label">Posted by:</span>
        <span className="value">{postedBy}</span>
      </p>
      <p className="info-item">
        <span className="label">Distributor Location:</span>
        <span className="value">{location}</span>
      </p>
      <p className="info-item">
        <span className="label">Close Date:</span>
        <span className="value">{closeDate}</span>
      </p>
      <button className="take-button">Take</button>
    </div>
  </div>
);

// Forum component that maps through card data
const Forum = () => {
  const [forums, setForums] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(baseurl + "/api/getAllProducts");
        setProducts(response.data || []); // Ensure fallback to empty array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to empty array in case of error
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/forums")
      .then((response) => response.json())
      .then((data) => {
        setForums(data.data || []); // Ensure fallback to empty array
      })
      .catch((error) => {
        console.error("Error fetching forums:", error);
      });
  }, []);

  return (
    <div className="FeedCardContainer">
      {forums.length > 0 ? (
        <div className="container">
          {forums.map((forum, index) => {
            if (index % 2 === 0) {
              // Fetch matching product for the first card
              const firstMatchingProduct = products.find(
                (product) => product.product_name === forum.product_name
              );
              const firstImagePath = firstMatchingProduct
                ? `${baseurl}/${firstMatchingProduct.images[0]?.image_path || "default_image.png"}`
                : "path_to_default_image.png";

              // Fetch matching product for the second card
              const secondForum = forums[index + 1];
              const secondMatchingProduct = secondForum
                ? products.find((product) => product.product_name === secondForum.product_name)
                : null;
              const secondImagePath = secondMatchingProduct
                ? `${baseurl}/${secondMatchingProduct.images[0]?.image_path || "default_image.png"}`
                : "path_to_default_image.png";

              return (
                <div className="row" key={index}>
                  {/* First Column */}
                  <FeedCard
                    imagePath={firstImagePath}
                    productName={
                      firstMatchingProduct?.product_name || forum.product_name || "Unknown"
                    }
                    quantity={forum.quantity || "N/A"}
                    postedBy={forum.distributor_name || "Unknown"}
                    location={forum.location || "Not Provided"}
                    closeDate={forum.close_date || "No Date"}
                  />
                  {/* Second Column */}
                  {secondForum && (
                    <FeedCard
                      imagePath={secondImagePath}
                      productName={
                        secondMatchingProduct?.product_name ||
                        secondForum.product_name ||
                        "Unknown"
                      }
                      quantity={secondForum.quantity || "N/A"}
                      postedBy={secondForum.distributor_name || "Unknown"}
                      location={secondForum.location || "Not Provided"}
                      closeDate={secondForum.close_date || "No Date"}
                    />
                  )}
                </div>
              );
            }
            return null; // Skip odd indices
          })}
        </div>
      ) : (
        <p>No forums available.</p>
      )}
    </div>
  );
};

export default Forum;
