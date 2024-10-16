import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated }) => {
    console.log('Protected Route isAuthenticated:', isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
