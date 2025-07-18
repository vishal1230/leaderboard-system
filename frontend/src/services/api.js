import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// User API calls
export const getAllUsers = () => api.get('/users');
export const createUser = (name) => api.post('/users', { name });
export const claimPoints = (userId) => api.post(`/users/${userId}/claim`);
export const getUserById = (userId) => api.get(`/users/${userId}`);

// History API calls
export const getAllHistory = () => api.get('/history');
export const getUserHistory = (userId) => api.get(`/history/${userId}`);

export default api;
