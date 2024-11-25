import React, { useState, useEffect, Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import userLogo from "../assets/user-logo.png";
import notify from "../assets/notify.png";
import Propic from "../assets/profile-pic.png";
import "../components/AdminNavbar.css";
import hamburger from "../assets/hamburger.png";
import AdminSidebar from "./AdminSidebar";
import { X, Box, MessageCircle } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AdminNavbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Received',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Received',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    },
    {
      id: 3,
      type: 'complaint',
      title: 'Complaint',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Received',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    },
    {
      id: 5,
      type: 'order',
      title: 'Order Received',
      message: 'Lorem ipsum dolor sit amet consectetur. Eget gravida nisl faucibus egestas.'
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'order':
        return <Box className="w-6 h-6 text-blue-500" />;
      case 'complaint':
        return <MessageCircle className="w-6 h-6 text-blue-500" />;
      default:
        return <Box className="w-6 h-6 text-blue-500" />;
    }
  };

  const handleClickNotify = (e) => {
    e.preventDefault(); 
    setShowNotifications(!showNotifications);
  };
    const handleLogout = () => {
      localStorage.removeItem('userData');
      window.location.href = '/Auth/Login';
    };
  const handleHamburgerClick = () => {
    console.log("clicked");
    setIsSidebarOpen(true);
  };

  const handleBackClick = () => {
    setIsSidebarOpen(false);
  };

  const handleNavigation = (path, e) => {
    e.preventDefault();
    // Add navigation logic here
    console.log(`Navigating to ${path}`);
    setIsSidebarOpen(false); // Close sidebar after navigation
  };

  useEffect(() => {
    // Update screen width when window is resized
    const handleResize = () => setScreenWidth(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  useEffect(() => {
    // Update the `tab` based on the current pathname
    if (location.pathname.startsWith("/Dashboard/products")) {
      setTab("Products");
    }
    else if(location.pathname.startsWith("/Dashboard/Distributors")){
      setTab("Distributors");
    } else{
    switch (location.pathname) {
      case "/Dashboard":
        setTab("Enterprise Ai hub");
        break;
      case "/Dashboard/forum":
        setTab("Forum");
        break;
      case "/Dashboard/products":
        setTab("Products");
        break;
      case "/Dashboard/Distributors":
        setTab("Distributors");
        break;
      case "/Dashboard/OrderSummary":
        setTab("OrderSummary");
        break;
      case "/Dashboard/Transport":
        setTab("Transport");
        break;
        case "/Dashboard/Accounts":
          setTab("Accounts");
          break;
          case "/Dashboard/Settings":
        setTab("Settings");
        break;
    }
  }
  }, [location.pathname]);

  return (
    <>
      {isSidebarOpen ? (
        <div>
          <AdminSidebar handleBackClick={handleBackClick} />
        </div>
      ) : (
        <div></div>
      )}
      <div>
        {screenWidth > 768 ? (
          <div className="adminNav" style={{ width: "100%" }}>
           <Navbar
  expand="lg"
  className="m-0 d-flex justify-content-between align-items-center"
  style={{ border: "none", backgroundColor: "white" }}
>
  <Navbar.Brand
    as={Link}
    to="/"
    style={{
      fontSize: "30px",
      fontWeight: "500",
      color: "#111111",
    }}
  >
    {tab}
  </Navbar.Brand>
  <Nav className="d-flex flex-row align-items-center" id="AdminNav">
    <input
      placeholder="Search Anything..."
      type="search"
      name="search"
      id="search"
      style={{
        marginRight: "15px",
        padding: "5px 10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
      }}
    />
    <Nav.Link as={Link} to="" style={{marginRight: '10px'}} 
      onClick={handleClickNotify}
    >
      <img
        src={notify}
        alt="notify"
        style={{ marginTop: "7px" }}
      />
    </Nav.Link>
    <Nav.Link as={Link} to="/Auth/Login" data-bs-toggle="modal"
        data-bs-target="#logoutModal">
      <img
        src={userLogo}
        alt="logout"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "5px",
        }}
      />
    </Nav.Link>
  </Nav>
</Navbar>

          </div>
        ) : (
          <div className="Mob-nav">
            <div onClick={handleHamburgerClick}>
              <img
                src={hamburger}
                alt="Hamburger Menu"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div>My cart</div>
            <div>
              <img src={Propic} alt="Profile" />
            </div>
          </div>
        )}
      </div>
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
      {showNotifications && (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-start justify-content-end" style={{ zIndex: 1000 }}>
    {/* Semi-transparent background overlay */}
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
      onClick={() => setShowNotifications(false)}
    ></div>

    {/* Notification panel */}
    <div className="position-relative bg-white mt-4 mx-3 rounded shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 mb-0">Notification</h2>
          <button
            className="btn btn-link border border-danger rounded-circle text-decoration-none p-0 text-danger"
            onClick={() => setShowNotifications(false)}
          >
            <X className="fs-5" />
          </button>
        </div>

        <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="d-flex align-items-start p-3 bg-white mb-2 notification-item"
            >
              <div
                className="d-flex align-items-center justify-content-center flex-shrink-0 border rounded me-3 notification-icon"
                style={{ width: '40px', height: '40px'}}
              >
                {getIcon(notification.type)}
              </div>

              <div className="flex-grow-1">
                <p className="mb-1 fw-bold">{notification.title}</p>
                <p className="mb-0 text-muted">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default AdminNavbar;
