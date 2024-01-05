// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://workout-manager-inc0.onrender.com:10000',
});

export default api;