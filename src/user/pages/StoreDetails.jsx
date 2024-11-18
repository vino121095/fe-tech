import React from "react";
import { useState } from "react";
import storeImg from "../assets/store-img.png";
import rating from "../assets/rating.png";
import '../pages/StoreDetails.css'
import NavBar from "../components/NavBar";
import NavbarSearch from "../components/NavbarSearch";



const StoreDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
    <NavBar />
    <NavbarSearch />
      <div className="card-section">
      <div className="StoreDetailsCard">
          <img src={storeImg} alt="" />
          <p className="p1" style={{ fontSize: "22px", fontWeight: "700" }}>
            Smart Accessories
          </p>
          <p className="p2" style={{ fontSize: "18px", fontWeight: "600" }}>
            AC Spare Part Wholesalers{" "}
          </p>
          <p className="p3" style={{ fontSize: "18px", fontWeight: "600" }}>
            Gandhipuram Coimbatore
          </p>
          <img
            className="rating"
            src={rating}
            alt="img"
            style={{ width: "122px", height: "40px" }}
          />
          <p className="p4">
            <i class="bi bi-telephone-fill"> View Mobile Number</i>
          </p>
          <button className="StoreDetailsBtn">Contact Supplier</button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={toggleModal}>&times;</span>
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
                <label className="col-sm-3 col-form-label"> Mobile Number</label>
                <div className="col-sm-9">
                  <input type="tel" className="form-controls" placeholder="Enter Your Mobile Number" />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label"> Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-controls" placeholder="Enter Your Name" />
                </div>
              </div>
              <div className="row mb-3 align-items-center">
                <label className="col-sm-3 col-form-label">Quantity</label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <input type="number" className="form-cont" placeholder="Enter Quantity" />
                    <span className="input-group-text">Piece</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn submitReq">Submit Requirement</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StoreDetails;
