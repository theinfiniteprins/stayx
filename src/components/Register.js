import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from "../configs/config";
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  // Helper function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Helper function to validate mobile number format
  const validateMobileNumber = (number) => {
    const re = /^[0-9]{10}$/;
    return re.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    // Validate form fields
    if (!name || !email || !mobileNumber || !password) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const userData = {
      name,
      email,
      mobileNumber,
      password,
    };

    setIsLoading(true);

    try {
      const response = await fetch(`${config.baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User registered successfully');
        setIsLoading(false);
        navigate('/login');
      } else {
        const result = await response.json();
        setIsLoading(false);
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-lg shadow-lg shadow-gray-800/80">
      <Helmet>
          <title>RentX | Register</title> {/* Custom title */}
        <meta name="description" content="Find your dream rental home on RentX. Explore verified listings, compare properties, and make your move easy." />
      </Helmet>
      <h2 className="text-center mb-5 text-2xl font-bold">Register</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display spinner while loading */}
      {isLoading && (
        <div className="flex justify-center items-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mobile Number</label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-500"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-teal-600">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
