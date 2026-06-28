import axios from "axios";
import { useAuthStore } from "@/stores/AuthStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { doRefresh } from "@/extends/methods/auth";
import { useRouter } from "vue-router";
import mockAdapter from "./axios.mock";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.adapter = mockAdapter;

axios.interceptors.request.use(
  (config) => {
    const { authUser } = useAuthStore();
    if (authUser) {
      const token = authUser.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { authUser } = useAuthStore();
    const originalRequest = error.config;

    // Hindari infinite loop jika request yang gagal adalah request refresh token
    if (originalRequest.url === "/api/refresh") {
      useAuthStore().clear();
      useProfileStore().clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    if ((error.status === 401 || error.response?.status === 401) && authUser && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await doRefresh();
        const newToken = useAuthStore().authUser?.access_token;
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore().clear();
        useProfileStore().clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
