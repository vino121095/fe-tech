import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import { CircleUserRound, Settings, LogOut } from 'lucide-react';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Correct way to import Bootstrap JS in React
import { useEffect } from 'react';
import * as bootstrap from 'bootstrap';

import '../components/AdminSidebar.css'
import Logo from '../assets/RiM-Logo.png'
import Enterprise from '../assets/AdminDashboardIcons/Enterprise ai.png'
import Forum from '../assets/AdminDashboardIcons/forum.png'
import Order from '../assets/AdminDashboardIcons/Order summary.png'
import Product from '../assets/AdminDashboardIcons/Product.png'
import Shipment from '../assets/AdminDashboardIcons/Shipment.png'
import Technician from '../assets/AdminDashboardIcons/Technicians.png'
import Distributor from '../assets/AdminDashboardIcons/Distributors.png'
import Transport from '../assets/AdminDashboardIcons/Transport.png'
import Shipments from './products/Shipments';

const AdminSidebar = ({handleBackClick}) => {
  const navigate = useNavigate();

  // Initialize Bootstrap dropdowns
  useEffect(() => {
    // Initialize all dropdowns
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl));
  }, []);

  const handleNavigation = (path, e) => {
    e.preventDefault();
    navigate(path);
  };

  const handleLogout = () => {
    // Your logout logic here, e.g., clearing user data, making an API call to log out, etc.
    console.log('Logged out');
    // After logout logic, you can redirect to a login page, or reset the app state.
    window.location.href = '/login'; // Example redirect
  };

  return (
    <>
     <div className='sideNavContainer'>
      <div className="Dashboardlogo">
        <img src={Logo} alt="logo"/>
      </div>
     <div className='sideNavLinks'>
     <div className="back-link" onClick={handleBackClick}>
            <i className="bi bi-arrow-left-short" style={{ cursor: 'pointer' }}></i> Back
          </div>
        <div className='general'>
           <small>General</small>
        </div>
        <div className='generalLinks'>
            <ul>
                <li><a href="/Dashboard" onClick={(e) => handleNavigation('/Dashboard', e)}><img src={Enterprise} alt=""/> Enterprise AI Hub</a></li>
                <li>
                  <a href='/Dashboard/forum' onClick={(e) => handleNavigation('/Dashboard/forum', e)}>
                    <img src={Forum} alt="" /> Forum
                  </a>
                </li>
                <li>
                  <div className="dropdown">
                    <button 
                      className="dropdown-toggle btn btn-link"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ textDecoration: 'none', padding: 0, border: 'none', color:'black' }}
                    >
                      <img src={Product} alt="" /> Products
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/Dashboard/products"
                          onClick={(e) => handleNavigation('/Dashboard/products', e)}
                        >
                          Product List
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/Dashboard/productView"
                          onClick={(e) => handleNavigation('/Dashboard/products/productView', e)}
                        >
                          Product View
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="" onClick={(e) => handleNavigation('/Dashboard/technicians', e)}>
                    <img src={Technician} alt="" /> Technicians
                  </a>
                </li>
                <li>
                    <a href="/Dashboard/Distributors" onClick={(e) => handleNavigation('/Dashboard/Distributors', e)}>
                      <img src={Distributor} alt="" /> Distributors
                    </a>
                </li>
            <li>
                  <a href="/Dashboard/Shipments" onClick={(e) => handleNavigation('/Dashboard/Shipments', e)}>
                    <img src={Shipment} alt="" /> Shipments
                  </a>
                </li>
                <li>
                  <a href="/Dashboard/Transport" onClick={(e) => handleNavigation('/Dashboard/Transport', e)}>
                    <img src={Transport} alt="" /> Transport
                  </a>
                </li>
                <li>
                    <a href="/Dashboard/OrderSummary" onClick={(e) => handleNavigation('/Dashboard/OrderSummary', e)}>
                      <img src={Order} alt="" /> Order Summary
                    </a>
                </li>
            </ul>
        </div>
        <div>
            <small className='support'>Support</small>
        </div>
        <div className='supportLinks'>
            <ul>
            <li><a href="/Dashboard/Accounts"><CircleUserRound /> Accounts</a></li>
                <li><a href="/Dashboard/Settings" onClick={(e) => handleNavigation('/Dashboard/Settings', e)}><Settings /> Settings</a></li>
                <li>
        <a href="#!" data-bs-toggle="modal" data-bs-target="#logoutModal">
          <LogOut /> Logout
        </a>
      </li>

      {/* Modal for Logout Confirmation */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content" style={{ height: '300px', display: 'flex', justifyContent: 'center' }}>
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to log out?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
                data-bs-dismiss="modal"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
            </ul>
        </div>
     </div>
     </div>
    </>
  )
}

export default AdminSidebar