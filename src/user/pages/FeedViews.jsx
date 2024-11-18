import React, { useState } from "react";
import "../pages/FeedViews.css";
import compressor from "../assets/compressor-img.png";
import NavBar from "../components/NavBar";
import NavbarSearch from "../components/NavbarSearch";

const FeedsViews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <NavBar />
      <NavbarSearch />
      <div className="search">
        
        <div className="feed-btn">
          <button onClick={toggleModal}>
            <i className="bi bi-box-seam"></i> Add Post
          </button>
        </div>
      </div>

      <div className="FeedCardContainer">
        <div className="FeedCard">
          <img src={compressor} alt="Product" className="product-image" />
          <div className="info">
            <p className="info-item">
              <span className="label">Product Name:</span>
              <span className="value">Emerson Refrigerator Compressor New</span>
            </p>
            <p className="info-item">
              <span className="label">Needed Quality:</span>
              <span className="value">2 Quality</span>
            </p>
            <p className="info-item">
              <span className="label">Post by:</span>
              <span className="value">Tools Mart</span>
            </p>
            <p className="info-item">
              <span className="label">Distributors Location:</span>
              <span className="value">Chennai</span>
            </p>
            <p className="info-item">
              <span className="label">Close Date:</span>
              <span className="value">24-Sep-2024</span>
            </p>
            <button className="take-button">Take</button>
          </div>
        </div>

        <div className="FeedCard">
          <img src={compressor} alt="Product" className="product-image" />
          <div className="info">
            <p className="info-item">
              <span className="label">Product Name:</span>
              <span className="value">Emerson Refrigerator Compressor New</span>
            </p>
            <p className="info-item">
              <span className="label">Needed Quality:</span>
              <span className="value">2 Quality</span>
            </p>
            <p className="info-item">
              <span className="label">Post by:</span>
              <span className="value">Tools Mart</span>
            </p>
            <p className="info-item">
              <span className="label">Distributors Location:</span>
              <span className="value">Chennai</span>
            </p>
            <p className="info-item">
              <span className="label">Close Date:</span>
              <span className="value">24-Sep-2024</span>
            </p>
            <button className="take-button">Take</button>
          </div>
        </div>
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
            <form>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">Product Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-controls"
                    value="AC Outdoor Stand"
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">Quantity</label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-cont"
                      placeholder="Enter Quantity"
                    />
                    <span className="input-group-text">Piece</span>
                  </div>
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">
                  Distributors Name
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-controls"
                    placeholder="Enter Your Name"
                  />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">
                  Distributors Location
                </label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <input type="text" className="form-cont" />
                    <span className="input-group-text">Piece</span>
                  </div>
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">
                  {" "}
                  Distributors Phone Number
                </label>
                <div className="col-sm-9">
                  <input
                    type="tel"
                    className="form-controls"
                    placeholder="Enter Your Mobile Number"
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
