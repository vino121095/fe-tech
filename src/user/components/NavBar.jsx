import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/RiM-Logo.png';
import userLogo from '../assets/user-logo.png';
import '../components/NavBar.css';
import Propic from "../assets/profile-pic.png";
import hamburger from '../assets/hamburger.png';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    // Update screen width when window is resized
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const handleLoginClick = () => {
    setIsMobileDropdownOpen(false);
    navigate('/Auth/Login');
  };

  const handleProfileClick = () => {
    setIsMobileDropdownOpen(false);
    navigate('/user/pages/ProfileInfo');
  };

  const handleDistributorsClick = () => {
    setIsMobileDropdownOpen(false);
    navigate('/user/pages/StoreDetails');
  };

  const handleOrderHistoryClick = () => {
    setIsMobileDropdownOpen(false);
    navigate('/user/pages/OrderHistory');
  };

  return (
    <nav>
      {screenWidth > 768 ? (
        <div className="nav-1">
          <p className="nav-para">
            <i className="bi bi-geo-alt-fill" style={{ color: 'red' }}></i> Location
          </p>
          <img className="logo" src={logo} alt="" />
          <div className="user-dropdown">
            <img className="userLogo" src={userLogo} alt="" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a href="#" onClick={handleLoginClick}>Login</a>
                <a href="#" onClick={handleProfileClick}>Profile</a>
                <a href="#" onClick={handleOrderHistoryClick}>Orders</a>
                <a href="#" onClick={handleDistributorsClick}>Distributors</a>
                <a href="#">Logout</a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="Mob-nav">
          <div onClick={toggleMobileDropdown}>
            <img src={hamburger} alt="Hamburger Menu" style={{ cursor: 'pointer' }} />
          </div>
          <div>My cart</div>
          <div>
            <img src={Propic} alt="Profile" />
          </div>
          {isMobileDropdownOpen && (
            <div className="mobile-dropdown">
              <div className="dropdown-header">
                <a href="#" onClick={toggleMobileDropdown} className="back-link">Back</a>
              </div>
              <a href="#" onClick={handleLoginClick}>Login</a>
              <a href="#" onClick={handleOrderHistoryClick}>Order History</a>
              <a href="#" onClick={handleDistributorsClick}>Distributors</a>
              <a href="#">Logout</a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
