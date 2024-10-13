import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import { FaUser, FaHome, FaHeart, FaFileAlt, FaLock, FaSignOutAlt } from 'react-icons/fa';
import config from "../configs/config";
import { getCookie } from '../utils/getCookie'; // Import the getCookie utility

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);
  const navigate = useNavigate();
  
  const token = getCookie('token'); // Get the token from the cookie
  const isAuthenticated = !!token; // Check if the token exists

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handlePrivacyPolicyClick = () => {
    navigate('/privacy-policy');
  };

  const handleTermsAndConditionsClick = () => {
    navigate('/terms-and-conditions');
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/auth/signout`, {
        method: 'GET',
        credentials: 'include', // to send cookies
      });

      if (response.ok) {
        // Clear the token from the cookie
        document.cookie = "token=; path=/; max-age=0; SameSite=Strict"; // Clear the token
        navigate('/'); // Optionally redirect to the home page
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
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
        {/* Conditional rendering based on authentication status */}
        {isAuthenticated ? (
          <Link to="/upload-property" className="upload-box">
            <span className="upload-plus">➕</span>
            <span className="upload-text">Upload Property</span>
          </Link>
        ) : (
          <div className="upload-box" onClick={handleLoginClick}>
            <span className="upload-plus">🔑</span>
            <span className="upload-text">Login/Register</span>
          </div>
        )}

        <div className="menu-icon-container" onClick={toggleMenu} ref={menuIconRef}>
          <i className="menu-icon">{menuOpen ? '✖' : '☰'}</i>
        </div>

        {/* Dropdown menu */}
        <div className={`dropdown-menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <ul>
            {isAuthenticated ? (
              <>
                <li onClick={handleProfileClick}><FaUser /> Profile</li>
                <li><FaHome /> My Properties</li>
                <li><FaHeart /> Favorites</li>
                <li onClick={handleTermsAndConditionsClick}><FaFileAlt /> Terms and Conditions</li>
                <li onClick={handlePrivacyPolicyClick}><FaLock /> Privacy Policy</li>
                <li onClick={handleSignOut}><FaSignOutAlt /> Sign Out</li>
              </>
            ) : (
              <>
                <li onClick={handleTermsAndConditionsClick}><FaFileAlt /> Terms and Conditions</li>
                <li onClick={handlePrivacyPolicyClick}><FaLock /> Privacy Policy</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
