import axios from 'axios';

const api = axios.create({
  baseURL: 'https://doctor-tracker-backend-18eacfem-abmrifat1.vercel.app/api', // 👈 তোমার লাইভ URL
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;