import axios from "axios";

const BASE_URL = "http://localhost:3500/";
const REFRESH_URL = "http://localhost:3500/user/refresh";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          REFRESH_URL,
          {},
          { withCredentials: true }
        );

        if (res.status === 200) {
          return instance(originalRequest);
        }
      } catch (err) {
        console.log("Refresh token failed");
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
