import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log('Authentication Status:', isAuthenticated); // Debug authentication status
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
