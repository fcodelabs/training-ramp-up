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
    console.log("error", error);
    const config = error?.config;
    console.log("config", config);
    if (error.response.status === 401 && !config.sent) {
      console.log("If condition");
      config.sent = true;
      await axios.post("http://localhost:3000/auth/refresh", {
        withCredentials: true,
      });

      config.headers = {
        ...config.headers,
      };

      // console.log("afterConfig", config.headers);

      return axios(config);
    }

    return Promise.reject(error);
  }
);
