import axios from 'axios';

const instance = axios.create({
    baseURL: "https://backend.rampup3.me",
    withCredentials: true,
});

instance.interceptors.response.use(
    (response) => response,
)