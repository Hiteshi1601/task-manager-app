import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === "development" 
    ? "http://localhost:5000" 
    : "https://task-manager-backend-pxtd.onrender.com");

const api = axios.create({
  baseURL: API_URL
});

export default api;
