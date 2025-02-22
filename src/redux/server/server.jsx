import axios from "axios";
import { refreshAuth } from "../fetures/authSlice"; // Import refresh token action
import { store } from "../store"; // Import Redux store

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Add an interceptor to refresh token if the request fails due to `401 Unauthorized`
api.interceptors.response.use(
  (response) => response, // If response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url === "/users" &&
        originalRequest.url.includes("users")) ||
      (originalRequest.url === "/notes" &&
        originalRequest.url.includes("notes"))
    ) {
      originalRequest._retry = true;

      try {
        // Call refresh API using Redux action
        const res = await store.dispatch(refreshAuth()).unwrap();
        console.log(res);
        // Update token in Redux state
        const newToken = res.accessToken;

        // Set new token in headers for future requests
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
