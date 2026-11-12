import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use(
  (config) => {
    // Check both 'token' and nested 'userInfo' in localStorage
    let token = localStorage.getItem('token');
    if (!token) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
      token = userInfo?.token;
    }

    if (token && token !== 'undefined' && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;