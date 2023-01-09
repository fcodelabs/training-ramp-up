import axios from 'axios';
const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosApiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403) {
      await axios.post(
        'http://localhost:8000/user/refresh',
        {},
        {
          withCredentials: true,
        }
      );
      originalRequest.headers = {
        ...originalRequest.headers,
      };
      return await axiosApiInstance(originalRequest);
    }
    return await Promise.reject(error);
  }
);
export default axiosApiInstance;
