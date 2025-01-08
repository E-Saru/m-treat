import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';  // Assuming a separate CSS file for styling

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/patient/api/register/', formData);
      setMessage('Registration successful!');
      setFormData({ name: '', email: '', phone: '', password: '' });

      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-form">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="submit-btn">Register</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegistrationForm;
