import React, { useState, useEffect } from "react";
import "../pages/FeedViews.css";
import compressor from "../assets/compressor-img.png";
import NavBar from "../components/NavBar";
import NavbarSearch from "../components/NavbarSearch";
import axios from "axios";
import baseurl from "../../apiService/apiService";
const FeedsViews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductImage, setSelectedProductImage] = useState('');
  const [formData, setFormData] = useState({
    quantity: '',
    distributor_name: '',
    location: '',
    phone_number: '',
  }); const [forums, setForums] = useState([]);


  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(baseurl + '/api/getAllProducts');
        setProducts(response.data || []); // Ensure fallback to empty array
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Fallback to empty array in case of error
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/forums')
      .then((response) => response.json())
      .then((data) => {
        setForums(data.data);
      })
      .catch((error) => {
        console.error('Error fetching forums:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    // Check for missing fields
    if (!selectedProduct || !formData.quantity || !formData.distributor_name || !formData.phone_number) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare submission data
    const submissionData = {
      product_name: selectedProduct,
      quantity: formData.quantity,
      distributor_name: formData.distributor_name,
      location: formData.location,
      phone_number: formData.phone_number,
    };

    console.log("Submission Data:", submissionData); // Debugging log

    try {
      const response = await axios.post(`${baseurl}/api/forum`, submissionData);

      console.log("API Response:", response); // Debugging log

      if (response.status === 200 && response.data?.message === "Forum created successfully") {
        alert("Requirement submitted successfully!");

        // Reset the form
        setFormData({
          quantity: "",
          distributor_name: "",
          location: "",
          phone_number: "",
        });
        setSelectedProduct("");
        setSelectedProductImage("");
        setIsModalOpen(false); // Close modal
      } else {
        alert("Requirement submitted successfully!");
      }
    } catch (error) {
      console.error("Submission Error:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
        alert(`Error: ${error.response.data.message || "An error occurred."}`);
      } else {
        alert("Failed to submit the requirement. Please check your network or contact support.");
      }
    }
  };

  const handleProductChange = (event) => {
    const selectedProductName = event.target.value;
    setSelectedProduct(selectedProductName); // Update the selected product
    // Find the product object based on the selected product name
    const selectedProduct = products.find(product => product.product_name === selectedProductName);
    if (selectedProduct) {
      setSelectedProductImage(selectedProduct.image_path); // Set the image URL for the selected product
    }
  };

  return (
    <>
      <NavBar />
      <div className="search row align-items-center">
        <div className="col">
          <NavbarSearch style={{ marginLeft: "-100px" }} />
        </div>

        <div className="col-auto">
          <div className="feed-btn">
            <button onClick={toggleModal}>
              <i className="bi bi-box-seam"></i> Add Post
            </button>
          </div>
        </div>
      </div>

      <div className="FeedCardContainer">
        {forums.length > 0 ? (
          forums.map((forum) => {
            // Find the corresponding product for the forum
            const matchingProduct = products.find(
              (product) => product.product_name === forum.product_name
            );

            return (
              <div className="FeedCard" key={forum.fid}>
                {matchingProduct ? (
                  <>
                    <img
                      src={baseurl + `/${matchingProduct.images[0]?.image_path || 'default_image.png'}`}
                      alt={matchingProduct.product_name}
                      onError={(e) => { e.target.src = 'path_to_default_image.png'; }} // Default image if missing
                      style={{ height: "100px" }}
                    />
                    <div className="info">
                      <p className="info-item">
                        <span className="label">Product Name:</span>
                        <span className="value">{matchingProduct.product_name}</span>
                      </p>
                      <p className="info-item">
                        <span className="label">Needed Quality:</span>
                        <span className="value">{forum.quantity || 'N/A'}</span> {/* Assuming needed_quality is in forum */}
                      </p>
                      <p className="info-item">
                        <span className="label">Post by:</span>
                        <span className="value">{forum.distributor_name || 'Unknown'}</span> {/* Assuming posted_by is in forum */}
                      </p>
                      <p className="info-item">
                        <span className="label">Distributors Location:</span>
                        <span className="value">{forum.location || 'Not Provided'}</span> {/* Assuming distributor_location is in forum */}
                      </p>
                      <p className="info-item">
                        <span className="label">Close Date:</span>
                        <span className="value">{forum.close_date || 'No Date'}</span> {/* Assuming close_date is in forum */}
                      </p>
                      <button className="take-button">Take</button>
                    </div>
                  </>
                ) : (
                  <p></p> // Show message if no matching product
                )}
              </div>
            );
          })
        ) : (
          <p>No forums available.</p>
        )}
      </div>


      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>
              &times;
            </span>
            <h4 className="sideHeading mb-4">
              Tell us what you need, and we'll help you get quotes
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">Product Name</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={selectedProduct}
                    onChange={handleProductChange}
                  >
                    <option value="" disabled>
                      Select Product Name
                    </option>
                    {products.map((product) => (
                      <option key={product.pid} value={product.product_name}>
                        {product.product_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">Quantity</label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <input
                      type="number"
                      name="quantity"
                      className="form-cont"
                      placeholder="Enter Quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                    <span className="input-group-text">Piece</span>
                  </div>
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">Distributors Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="distributor_name"
                    className="form-controls"
                    placeholder="Enter Your Name"
                    value={formData.distributor_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">Distributors Location</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    name="location"
                    className="form-cont"
                    placeholder="Enter Location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">Distributors Phone Number</label>
                <div className="col-sm-9">
                  <input
                    type="tel"
                    name="phone_number"
                    className="form-controls"
                    placeholder="Enter Your Mobile Number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn submitReq">
                Submit Requirement
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedsViews;
