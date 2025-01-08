import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setPatientData } from '../redux/slices/authSlice';
import './Dashboard.css'; // Import custom styles

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const patientData = useSelector((state) => state.auth.patientData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/patient/api/dashboard/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setPatientData(response.data));
        setEditData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    if (token) {
      fetchPatientData();
    }
  }, [token, dispatch]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://127.0.0.1:8000/api/patient/api/dashboard/', editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Profile updated successfully!');
      dispatch(setPatientData(editData));
      setIsEditing(false);
    } catch (error) {
      setMessage('Update failed. Please try again.');
    }
  };

  if (!patientData) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-container">
      <h2 className="welcome-message">Welcome, {patientData.name}</h2>
      <div className="profile-section">
        <h3>Profile Details</h3>
        <p>
          <strong>Email:</strong> {patientData.email}
        </p>
        <p>
          <strong>Phone:</strong> {patientData.phone}
        </p>
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="edit-form">
            <input
              type="text"
              name="name"
              value={editData.name || ''}
              onChange={handleChange}
              placeholder="Enter your name"
              className="form-input"
              required
            />
            <input
              type="tel"
              name="phone"
              value={editData.phone || ''}
              onChange={handleChange}
              placeholder="Enter your phone"
              className="form-input"
              required
            />
            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {message && <p className="message-text">{message}</p>}
    </div>
  );
};

export default Dashboard;
