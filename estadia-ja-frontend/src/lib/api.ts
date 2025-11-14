import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Erro 401: Token expirado ou inválido. Deslogando...");
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export default api;