import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5400/',
});

axiosInstance.interceptors.response.use(
    async (response) => response,
    (error) => {
        if (error.response.status === 401) {
            console.log('response status: ', error.response.status);
            const getRefreshToken = async () => {
                const res = await axios.get("http://localhost:5400/refresh", {
                    withCredentials: true
                })
                localStorage.setItem("accessToken", res.data.access_token);
            }
            getRefreshToken();
        }
    }
);

export default axiosInstance;