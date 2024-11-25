import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import "../products/Distributors.css";
import { Box, Upload, Eye, PencilLine, Trash2, X } from "lucide-react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import baseurl from "../../../apiService/apiService";
import { useNavigate } from "react-router-dom";

const Distributors = () => {
  const navigate = useNavigate();
  const [distributors, setDistributors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDistributor, setCurrentDistributor] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/getAllDistributors`);
      setDistributors(response.data || []);
    } catch (error) {
      console.error("Error fetching distributors:", error);
      setDistributors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const formData = new FormData();
      
      // Add all distributor fields
      const distributorData = {
        companyname: currentDistributor?.companyname || '',
        location: currentDistributor?.location || '',
        gstnumber: currentDistributor?.gstnumber || '',
        creditlimit: currentDistributor?.creditlimit || '',
        contact_person_name: currentDistributor?.contact_person_name || '',
        phoneno: currentDistributor?.phoneno || '',
        email: currentDistributor?.email || ''
      };

      // Add distributor data as a JSON string
      Object.entries(distributorData).forEach(([key, value]) => {
        formData.append(key, value);
    });

      // Handle images
      if (currentDistributor?.did) {
        // Update case
        formData.append('did', currentDistributor.did);
        
        // Add existing images as JSON string
        if (existingImages.length > 0) {
          formData.append('existingImages', JSON.stringify(existingImages));
        }
      }

      // Add new images
      imageFiles.forEach((file, index) => {
        formData.append('image', file);
      });

      const url = currentDistributor?.did
        ? `${baseurl}/api/updateDistributorById/${currentDistributor.did}`
        : `${baseurl}/api/addDistributor`;

      const response = await axios({
        method: currentDistributor?.did ? "put" : "post",
        url,
        data: formData
      });

      alert(response.data.message);
      fetchDistributors();
      resetForm();
      toggleModal();
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response?.data?.message || "Failed to save distributor");
    }
  };

  const resetForm = () => {
    setCurrentDistributor(null);
    setImageFiles([]);
    setExistingImages([]);
    setError('');
  };

  const handleViewDetails = (distributor) => {
    navigate(`/Dashboard/Distributors/DistributorsViewDetails/${distributor.did}`);
  };

  const handleEditDistributor = (distributor) => {
    setCurrentDistributor(distributor);
    setExistingImages(distributor.image?.map((img, index) => ({
      id: index,
      image_path: img.image_path
    })) || []);
    setIsModalOpen(true);
    setError('');
  };

  const handleDeleteDistributor = async (distributor) => {
    const confirmed = window.confirm("Are you sure you want to delete this distributor?");
    if (confirmed) {
      try {
        await axios.delete(`${baseurl}/api/deleteDistributorById/${distributor.did}`);
        alert("Distributor deleted successfully");
        fetchDistributors();
      } catch (error) {
        console.error("Error deleting distributor:", error);
        alert("Failed to delete distributor");
      }
    }
  };

  const handleDeleteImage = async (imageIndex) => {
    setExistingImages(existingImages.filter((_, index) => index !== imageIndex));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prevFiles => [...prevFiles, ...files]);
    setError('');
  };

  const removeNewImage = (index) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDistributor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      resetForm();
    }
  };

  // Pagination calculations
  const indexOfLastDistributor = currentPage * itemsPerPage;
  const indexOfFirstDistributor = indexOfLastDistributor - itemsPerPage;
  const currentDistributors = distributors.slice(indexOfFirstDistributor, indexOfLastDistributor);
  const totalPages = Math.ceil(distributors.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="searches">
        <div className="searchInputs" id="searchBox">
          <input
            type="text"
            className="search-input"
            placeholder="Search Distributor"
          />
          <div className="searchIcons">
            <i className="bi bi-search" style={{ color: "#808080" }}></i>
          </div>
        </div>
        <div className="add-btn">
          <button onClick={toggleModal}>
            <i className="bi bi-plus-circle"></i> Add Distributor
          </button>
        </div>
      </div>

      <div className="orderDetails">
        <ul>
          <a href="">
            <li>All Distributors</li>
          </a>
          <a href="">
            <li>Archive</li>
          </a>
          <a href="">
            <li>New Distributors</li>
          </a>
        </ul>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Organization Name</th>
            <th>Contact Person</th>
            <th>Contact Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentDistributors.map((distributor, index) => (
            <tr key={index}>
              <td>{indexOfFirstDistributor + index + 1}</td>
              <td>{distributor.companyname}</td>
              <td>{distributor.contact_person_name}</td>
              <td>{distributor.phoneno || "-"}</td>
              <td className="status">
                <Eye
                  style={{ color: "#091975", cursor: "pointer", marginRight: '10px' }}
                  onClick={() => handleViewDetails(distributor)}
                />
                <PencilLine
                  style={{ color: "#699BF7", cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => handleEditDistributor(distributor)}
                />
                <Trash2
                  style={{ color: "#F24E1E", cursor: 'pointer' }}
                  onClick={() => handleDeleteDistributor(distributor)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container d-flex mt-2 justify-content-between">
        <div className="results-count text-center mb-3">
          Showing {currentDistributors.length === 0 ? '0' : indexOfFirstDistributor + 1} to {Math.min(indexOfLastDistributor, distributors.length)} of {distributors.length} entries
        </div>
        <Pagination className="justify-content-center" style={{ gap: "10px" }}>
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
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content distributor-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{currentDistributor?.did ? "Edit Distributor" : "Distributor Registration"}</h2>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form onSubmit={handleSubmit} className="distributor-registration-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyname"
                    placeholder="Enter company name"
                    onChange={handleInputChange}
                    value={currentDistributor?.companyname || ''}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    onChange={handleInputChange}
                    value={currentDistributor?.location || ''}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>GST Number</label>
                  <input
                    type="text"
                    name="gstnumber"
                    placeholder="Enter GST number"
                    onChange={handleInputChange}
                    value={currentDistributor?.gstnumber || ''}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Credit Limit</label>
                  <input
                    type="text"
                    name="creditlimit"
                    placeholder="Enter credit limit"
                    onChange={handleInputChange}
                    value={currentDistributor?.creditlimit || ''}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Person Name</label>
                  <input
                    type="text"
                    name="contact_person_name"
                    placeholder="Enter contact person's name"
                    onChange={handleInputChange}
                    value={currentDistributor?.contact_person_name || ''}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phoneno"
                    placeholder="Enter phone number"
                    onChange={handleInputChange}
                    value={currentDistributor?.phoneno || ''}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleInputChange}
                    value={currentDistributor?.email || ''}
                  />
                </div>
              </div>
              <div className="form-row d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="image-upload-section">
                  {/* Existing Images */}
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="image-preview">
                      <img
                        src={`${baseurl}/${image.image_path}`}
                        alt={`Existing ${index}`}
                      />
                      <button
                        type="button"
                        className="delete-image"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {/* New Images */}
                  {imageFiles.map((file, index) => (
                    <div key={`new-${index}`} className="image-preview">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New ${index}`}
                      />
                      <button
                        type="button"
                        className="delete-image"
                        onClick={() => removeNewImage(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {/* Upload Button */}
                  <label className="upload-box">
                    <input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <span className="upload-icon"><Upload /></span>
                  </label>
                </div>
              </div>
              <div className="form-row">
                <button type="submit" className="submit-button">
                  {currentDistributor?.did ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributors;