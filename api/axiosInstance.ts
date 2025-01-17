import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: "https://demo.splynx.com/api/2.0",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("auth_token");

    if (token) {
      config.headers.Authorization = `Splynx-EA (access_token=${token})`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
