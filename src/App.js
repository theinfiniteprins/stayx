import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UploadProperty from './components/UploadProperty';
import ShowProperty from './components/ShowProperty';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar is only added once here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-property" element={<UploadProperty />} />
        <Route path="/property/:id" element={<ShowProperty />} />
      </Routes>
    </Router>
  );
};

export default App;
