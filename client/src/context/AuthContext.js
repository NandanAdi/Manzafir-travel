import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  

  // Function to handle user signup

  const signup = async (name, email, password) => {

    try {
      console.log('Signup data:', { name, email, password }); // Log the payload
      const response = await axiosInstance.post('/users/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Function to handle user login
  
  const login = async (email, password) => {

    try {
      const response = await axiosInstance.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      setUser(response.data.user);
      
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Function to fetch the current user profile
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  };

  // Automatically fetch user if token is present
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
