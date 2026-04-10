import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  headers: { "Content-Type": "application/json" },
});

// Attach Bearer token from auth store on every request
apiClient.interceptors.request.use((config) => {
  // Lazy import to avoid circular dependency
  const { useAuthStore } = require("@/store/useAuthStore");
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { useAuthStore } = require("@/store/useAuthStore");
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);
