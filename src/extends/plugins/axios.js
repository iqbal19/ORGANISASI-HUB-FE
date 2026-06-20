import axios from "axios";
import { useAuthStore } from "@/stores/AuthStore";
import { doRefresh } from "@/extends/methods/auth";
import { useRouter } from "vue-router";
import mockAdapter from "./axios.mock";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.adapter = mockAdapter;

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
    if ((error.status === 401 || error.response?.status === 401) && authUser) {
      // const router = useRouter();
      // router.replace("/login");
      await doRefresh();
      const originalRequest = error.config;
      const newToken = authUser.access_token;
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axios;
