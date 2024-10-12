import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Redirect to the Profile page
  };

  return (
    <nav className="flex justify-between items-center bg-teal-600 p-2">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleLogoClick}
      >
        <img
          src="/images/logo.jpg"
          alt="RentX Logo"
          className="w-12 h-12 rounded-md border-2 border-white shadow-md mr-2" // Reduced size from w-16 h-16 to w-12 h-12
        />
      </div>
      <div className="text-center ml-30">
        <h1 className="text-2xl font-bold text-white font-poppins">RentX</h1>{" "}
        {/* Added 'Poppins' font */}
      </div>
      <div className="flex items-center">
        <Link
          to="/upload-property"
          className="flex items-center bg-white text-black px-3 py-2 rounded-md mr-4"
        >
          <span className="text-lg mr-1">➕</span>
          <span className="text-md">Upload Property</span>
        </Link>
        <div
          className="flex justify-center items-center w-10 h-10 border border-white rounded-full cursor-pointer"
          onClick={toggleMenu}
        >
          <i className="text-white text-xl not-italic">☰</i>{" "}
          {/* Ensured non-italic */}
        </div>
        {menuOpen && (
          <div
            className="absolute right-2 top-16 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50"
            ref={menuRef}
          >
            <ul className="list-none m-0 p-0">
              <li
                className="p-2 flex items-center cursor-pointer text-black"
                onClick={handleProfileClick}
              >
                <i className="mr-2 not-italic">👤</i> Profile
              </li>
              <li className="p-2 flex items-center cursor-pointer text-black">
                <i className="mr-2 not-italic">🏠</i> My Property
              </li>
              <li className="p-2 flex items-center cursor-pointer text-black">
                <i className="mr-2 not-italic">❤️</i> Favourite
              </li>
              <li className="p-2 flex items-center cursor-pointer text-black">
                <i className="mr-2 not-italic">📄</i> Terms and Conditions
              </li>
              <li className="p-2 flex items-center cursor-pointer text-black">
                <i className="mr-2 not-italic">🔒</i> Privacy Policy
              </li>
              <li className="p-2 flex items-center cursor-pointer text-black">
                <i
                  className="mr-2 not-italic fa fa-sign-out"
                  aria-hidden="true"
                ></i>{" "}
                Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
