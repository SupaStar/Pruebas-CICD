// src/api/axios.ts
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/';
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Interceptor de petición: añade token si existe
axiosInstance.interceptors.request.use(config => {
  const token = null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Interceptor de respuesta: manejo de errores global (p.ej. 401)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Por ejemplo, limpiar estado de autenticación
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
