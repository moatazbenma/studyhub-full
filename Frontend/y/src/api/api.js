import axios from "axios";

const API = axios.create({
  baseURL: "https://studyhub-full.onrender.com/api/",
});

// ✅ Add Authorization Header before each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Refresh token automatically if 401 Unauthorized
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if token expired and we haven’t retried yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
          console.warn("No refresh token found.");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const res = await axios.post("https://studyhub-full.onrender.com/api/token/refresh/", {
          refresh: refresh,
        });

        const newAccess = res.data.access;
        localStorage.setItem("token", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
