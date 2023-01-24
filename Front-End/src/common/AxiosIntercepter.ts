import axios from "axios";
// import { RefreshTokenFn } from "./RefreshToken";
export const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      await axios.post("http://localhost:8000/auth/refresh", {
        withCredentials: true,
      });

      config.headers = {
        ...config.headers,
      };

      return axios(config);
    }

    return Promise.reject(error);
  }
);
