import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "production" ? "/api/v1" : "http://localhost:3000/api/v1",
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { axiosInstance };