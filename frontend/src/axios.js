import axios from "axios";
const api = axios.create({
  baseURL: "https://hubcredo-r4h9.onrender.com/api", // Render backend URL
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
