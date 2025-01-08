import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null, // Stores the access token for authentication
    refreshToken: null, // Stores the refresh token for token renewal
    patientData: null, // Stores patient-related data
    isAuthenticated: false, // Tracks authentication status
  },
  reducers: {
    setToken(state, action) {
      const { token, refreshToken } = action.payload;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = !!token;
    },
    setPatientData(state, action) {
      state.patientData = action.payload;
    },
    logout(state) {
      state.token = null;
      state.refreshToken = null;
      state.patientData = null;
      state.isAuthenticated = false;
    },
    refreshAccessToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { setToken, setPatientData, logout, refreshAccessToken } = authSlice.actions;
export default authSlice.reducer;
