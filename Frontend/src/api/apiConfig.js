import axios from 'axios';

const api = axios.create({
  baseURL: 'https://virtual-medical-appointment-system-backend.vercel.app', // Replace with your backend API URL
  withCredentials: true,
});

export default api;