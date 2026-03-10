import axios from "axios";

const BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, "") + "/api/v1"
  : "https://a1classescentreofknowledge-api.onrender.com/api/v1";

const api = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

let authToken = null;

export const setToken = (token) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Attach token on every request (safety net)
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
});

export default api;