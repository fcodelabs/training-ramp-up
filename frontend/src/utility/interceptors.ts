import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Additional imports for refreshToken function and security measures
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
// axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
//   if (isTokenExpiring(accessToken)) {
//     return refreshToken()
//       .then((newAccessToken: UserAccessToken) => {
//         config.headers.Authorization = `Bearer ${newAccessToken.token}`;
//         return config;
//       })
//       .catch((error) => {
//         // Handle refresh token error
//         throw error;
//       });
//   }
//   return config;
// });

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("response", response);
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      console.log("403 error");
      try {
        const newAccessToken = await refreshToken();
        // Retry the original request with the new token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;
        return await axiosInstance(originalRequest);
      } catch (error_1) {
        // Handle refresh token error or redirect to login
        throw error_1;
      }
    }
    return Promise.reject(error);
  }
);

async function refreshToken(): Promise<any> {
  try {
    console.log("refreshToken");
    const response = await axiosInstance.post("/refresh", null, {
      withCredentials: true,
    });
    return response.data; // Assuming response contains the new access token
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Propagate error to caller
  }
}

export default { axiosInstance };
