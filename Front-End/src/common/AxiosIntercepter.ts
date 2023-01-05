import axios from "axios";
// import { RefreshTokenFn } from "./RefreshToken";
export const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    console.log("interceptor1");
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
    console.log("interceptor2");
    return response;
  },
  async (error) => {
    const config = error?.config;
    console.log("interceptor3");
    if (error?.response?.status === 401 && !config?.sent) {
      console.log("interceptor4");
      config.sent = true;
      const data = await axios.post("http://localhost:3000/user/refresh", {
        withCredentials: true,
      });
      console.log("Here data");
      console.log(data);

      console.log("interceptor6");
      config.headers = {
        ...config.headers,
      };
      console.log(config);

      return axios(config);
    }
    console.log("interceptor5");

    return Promise.reject(error);
  }
);
