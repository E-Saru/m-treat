import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setToken } from '../redux/slices/authSlice';
import './LoginForm.css'; // Include CSS Module or custom styles

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/patient/api/login/', credentials);
      if (response.data.access) {
        dispatch(setToken({ token: response.data.access, refreshToken: response.data.refresh }));
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Please login to continue</p>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={credentials.username}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
          <p>
            Don't have an account? <a href='/'>Register</a>
          </p>
      </form>
    </div>
  );
};

export default LoginForm;
