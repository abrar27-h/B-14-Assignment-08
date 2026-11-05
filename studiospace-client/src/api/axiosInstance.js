import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Challenge 1: HTTPOnly cookie support
});


const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://b-14-assignment-08.onrender.com",
  withCredentials: true
});

export { axiosInstance, axiosSecure };

