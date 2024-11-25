import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { User, Plus } from 'lucide-react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import baseurl from '../../../apiService/apiService';
import './Technicians.css'; // Ensure this CSS file is created with the provided styles

const TechniciansList = () => {
  const [technicians, setTechnicians] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(baseurl+'/api/allUsers');
        setTechnicians(response.data.data || []);
      } catch (error) {
        console.error('Error fetching technicians:', error);
        setTechnicians([]); 
      }
    };

    fetchTechnicians();
  }, []);

  // Filtering technicians based on search term
  const filteredTechnicians = technicians.filter(technician => 
    Object.values(technician).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastTechnician = currentPage * itemsPerPage;
  const indexOfFirstTechnician = indexOfLastTechnician - itemsPerPage;
  const currentTechnicians = filteredTechnicians.slice(indexOfFirstTechnician, indexOfLastTechnician);
  const totalPages = Math.ceil(filteredTechnicians.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  const handleAddTechnician = () => {
    // Implement add technician logic or open modal
    console.log('Add Technician clicked');
  };

  return (
    <div className="container">
      <div className="searches">
        <div id="technicianSearchBox">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search Technician" 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
          <div className="searchIcons">
            <i className="bi bi-search"></i>
          </div>
        </div>
        
        <button 
          id="AddTechnicianBtn" 
          onClick={handleAddTechnician}
        >
          <Plus size={18} style={{ marginRight: '8px' }} /> Add Technician
        </button>
      </div>
<div className="table-container"><table className="technicians-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {currentTechnicians.map((technician, index) => (
            <tr key={technician.uid}>
              <td>{index+1}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div className="technician-icon">
                    <User color="white" size={10} />
                  </div>
                  {technician.full_name}
                </div>
              </td>
              <td>{technician.email}</td>
              <td>{technician.mobile_number}</td>
              <td>{technician.city}</td>
              <td>{technician.state}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
      

      <div className="technicianPagination">
        <div className="results-count text-center mb-3">
          Showing {currentTechnicians.length === 0 ? '0' : indexOfFirstTechnician + 1} to {Math.min(indexOfLastTechnician, filteredTechnicians.length)} of {filteredTechnicians.length} entries
        </div>

        <Pagination className="justify-content-center">
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <MdChevronLeft />
          </Pagination.Prev>

          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <MdChevronRight />
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
};

export default TechniciansList;