import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // For navigation

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle click outside the dropdown menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Function to navigate to home when the logo is clicked
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={handleLogoClick}>
        {/* Logo with link to home */}
        <img src="/images/logo.jpg" alt="RentX Logo" className="navbar-logo" />
      </div>
      <div className="navbar-center">
        <h1 className="navbar-title">RentX</h1>
      </div>
      <div className="navbar-right">
        {/* Upload Property button with link */}
        <Link to="/upload-property" className="upload-box">
          <span className="upload-plus">➕</span>
          <span className="upload-text">Upload Property</span>
        </Link>

        {/* Menu icon */}
        <div className="menu-icon-container" onClick={toggleMenu}>
          <i className="menu-icon">☰</i>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="dropdown-menu" ref={menuRef}>
            <ul>
              <li><i className="menu-item-icon">👤</i> Profile</li>
              <li><i className="menu-item-icon">🏠</i> My Property</li>
              <li><i className="menu-item-icon">➕</i> Upload Property</li>
              <li><i class="fa fa-sign-out" aria-hidden="true"></i> Sign Out</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
