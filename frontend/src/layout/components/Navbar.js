import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ handleSidebarToggle, newNotificationsCount }) => {
  return (
    <nav id="navbar">
      <button className="sidebar-toggle" onClick={handleSidebarToggle}>
        <i className='bx bx-menu'></i>
      </button>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className='bx bx-search'></i>
          </button>
        </div>
      </form>
      <div className="right-items">
        <Link to="/user/notifications" className="notification-icon">
          <i className='bx bx-bell'></i>
          {newNotificationsCount > 0 && (
            <span className="notification-bubble">{newNotificationsCount}</span>
          )}
        </Link>

        <div className="login-button-container">
          <a href={`/login`} className="login-button">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
