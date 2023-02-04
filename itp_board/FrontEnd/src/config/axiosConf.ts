import axios, {AxiosResponse} from 'axios';
import { store} from '../store';
import {signOutUser} from "../pages/signIn/signInSlice";

export default axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}/`,
    withCredentials: true,
});

export const axiosPrivate = axios.create(
    {
        baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}/`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + localStorage.getItem('token')
        }
    }
)
axiosPrivate.interceptors.response.use(
    async (response: AxiosResponse) => response,
    async (error: any) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const res = await axiosPrivate(
                {
                    url:'/user/refreshtoken',
                    method:'post',
                }

            );
            if (res?.status === 200) {
                return axiosPrivate(originalRequest);
            }
        }
        if(error.response && error.response.status === 401){
            store.dispatch(signOutUser());
        }
    }
);

