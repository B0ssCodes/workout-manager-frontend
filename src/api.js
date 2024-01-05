// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://workout-manager-inc0.onrender.com',
});

export default api;