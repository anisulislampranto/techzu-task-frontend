import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');

  if (token) {
    cfg.headers = cfg.headers || {};
    cfg.headers.set('Authorization', `Bearer ${token}`);
  }

  return cfg;
});

export default api;
