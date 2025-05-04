import axios from "axios";

// Set base URL for backend API
const API_URL = "http://localhost:5000/api/auth/";

// Register new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login and get JWT token
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
