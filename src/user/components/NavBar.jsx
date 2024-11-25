import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/RIm-01_1-removebg-preview.png';
import userLogo from '../assets/user-logo.png';
import '../components/NavBar.css';
import Propic from "../assets/profile-pic.png";
import hamburger from '../assets/hamburger.png';
import profile from '../assets/profile.png'
import order from '../assets/orders.png'
import logout from '../assets/Vector.png'
import 'bootstrap-icons/font/bootstrap-icons.css';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loggeduser, setloggerUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Update screen width when window is resized
    const handleResize = () => setScreenWidth(window.innerWidth);
    const loggeduser = JSON.parse(localStorage.getItem('userData'));
    setloggerUser(loggeduser);
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
 const handleLogout = ()=>{
  localStorage.removeItem("userData");
  alert('Logout successfully');
 }
  return (
    <nav>
      {screenWidth > 768 ? (
        <div className="nav-1">
          <p className="nav-para">
            <i className="bi bi-geo-alt-fill" style={{ color: 'red' }}></i> 
            <span style={{color:'black'}}>Location</span>
          </p>
          <a href="/" ><img className="logo" src={logo} alt="" /></a>
          <div className="user-dropdown">
            <img className="userLogo" src={userLogo} alt="" onClick={toggleDropdown} />
            {isDropdownOpen && (
  <div className="userDropdownMenu">
    {!loggeduser ? (
      <a href="/Auth/Login">Login</a>
    ) : (
      <>
        <a href="/user/pages/ProfileInfo">
          <span>
            <img src={profile} alt="Profile" />
          </span>
          Profile
        </a>
        <a href="/user/pages/OrderHistory">
          <span>
            <img src={order} alt="Order History" />
          </span>
          Orders
        </a>
        {/* Uncomment below lines if needed */}
        {/* <a href="/user/pages/StoreDetails">Distributors</a> */}
        {/* <a href="/user/pages/Cart">Add to Cart</a> */}
        <a href="/" onClick={handleLogout}>
          <span>
            <img src={logout} alt="Logout" />
          </span>
          Logout
        </a>
      </>
    )}
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
              <a href="/Auth/Login" >Login</a>
              <a href="/user/pages/OrderHistory" >Order History</a>
              <a href="/user/pages/StoreDetails" >Distributors</a>
              <a href="/user/pages/Cart" >Add to Cart</a>
              <a href="/" onClick={handleLogout}>Logout</a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
