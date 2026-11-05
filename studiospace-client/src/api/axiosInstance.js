import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Challenge 1: HTTPOnly cookie support
});

export default axiosInstance;



