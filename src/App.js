import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UploadProperty from './components/UploadProperty';
import ShowProperty from './components/ShowProperty';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/profile';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar is only added once here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-property" element={<UploadProperty />} />
        <Route path="/property/:id" element={<ShowProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  );
};

export default App;