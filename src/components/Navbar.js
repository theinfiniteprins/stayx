// Navbar/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import { FaUser, FaHome, FaHeart, FaFileAlt, FaLock, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuIconRef = useRef(null); 
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle click outside the dropdown menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && menuIconRef.current && 
      !menuIconRef.current.contains(event.target)) {
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

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={handleLogoClick}>
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
        <div className="menu-icon-container" onClick={toggleMenu} ref={menuIconRef}>
          <i className="menu-icon">{menuOpen ? '✖' : '☰'}</i>
        </div>

        {/* Dropdown menu */}
        <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <ul>
            <li onClick={handleProfileClick}><FaUser /> Profile</li>
            <li><FaHome /> My Properties</li>
            <li><FaHeart /> Favorites</li>
            <li><FaFileAlt /> Terms and Conditions</li>
            <li><FaLock /> Privacy Policy</li>
            <li><FaSignOutAlt /> Sign Out</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
