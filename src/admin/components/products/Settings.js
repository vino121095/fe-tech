import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-wrapper">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="user-profile">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS_Oktp8MYAmnMY7NisBv19ITjGhQlP3ikBWf2vEmmFhUoXlBWP"
              alt="User Avatar"
              className="profile-avatar"
            />
            <h4 className="user-name">User Name</h4>
            <p className="user-email">login@gmail.com</p>
          </div>
          <ul className="settings-menu">
            <li className="menu-item">
              <i className="icon bi bi-palette"></i>
              <div>
                <p className="menu-title">Appearances</p>
                <p className="menu-subtitle">Dark mode, light mode, more</p>
              </div>
              <i className="arrow bi bi-chevron-right"></i>
            </li>
            <li className="menu-item">
              <i className="icon bi bi-shield-lock"></i>
              <div>
                <p className="menu-title">Security</p>
                <p className="menu-subtitle">Change Password, etc</p>
              </div>
              <i className="arrow bi bi-chevron-right"></i>
            </li>
            <li className="menu-item">
              <i className="icon bi bi-bell"></i>
              <div>
                <p className="menu-title">Notification</p>
                <p className="menu-subtitle">Notifications in dashboard</p>
              </div>
              <i className="arrow bi bi-chevron-right"></i>
            </li>
            <li className="menu-item">
              <i className="icon bi bi-envelope"></i>
              <div>
                <p className="menu-title">E-mail</p>
                <p className="menu-subtitle">Newsletter, and Subscribe</p>
              </div>
              <i className="arrow bi bi-chevron-right"></i>
            </li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="notification-settings">
            <h2 className="settings-title">Notification Settings</h2>
            <p className="settings-description">
              Lorem ipsum dolor sit amet consectetur. Hac amet nisi sem imperdiet nulla.
            </p>
            <div className="email-notifications">
              <h4 className="section-title">Email Notifications</h4>
              <p className="section-description">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <div className="notification-item">
                <span>News & Update</span>
                <input type="checkbox" className="toggle-switch" />
              </div>
              <div className="notification-item">
                <span>Screen Notification</span>
                <input type="checkbox" className="toggle-switch" />
              </div>
              <div className="notification-item">
                <span>Message</span>
                <input
                  type="checkbox"
                  className="toggle-switch"
                  defaultChecked
                />
              </div>
              <div className="notification-item">
                <span>Order</span>
                <input type="checkbox" className="toggle-switch" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
