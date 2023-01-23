import axios from 'axios';
const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosApiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log('ínterceptor caling...');
    const originalRequest = error.config;
    if (error.response.status === 403) {
      const res = await axios.post(
        'http://localhost:8000/users/refresh',
        {},
        {
          withCredentials: true,
        }
      );
      originalRequest.headers = {
        ...originalRequest.headers,
      };
      console.log(res);
      return await axiosApiInstance(originalRequest);
    }
    return await Promise.reject(error);
  }
);
export default axiosApiInstance;
