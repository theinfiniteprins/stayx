import React from 'react';
import '../styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Logo */}
        <img src="/images/logo.jpg" alt="RentX Logo" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        <h1 className="navbar-title">RentX</h1>
      </div>
      <div className="navbar-right">
        {/* Upload Property button */}
        <div className="upload-box">
          <span className="upload-plus">+</span>
          <span className="upload-text">Upload Property</span>
        </div>
        {/* Menu icon */}
        <div className="menu-icon-container">
          <i className="menu-icon">☰</i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
