/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from 'axios'
import axiosInstance from './api'

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log('interceptor1')
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config
  },
  (error) => {
    void Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('interceptor2')
    return response
  },
  async (error) => {
    const config = error?.config
    console.log('interceptor3')
    if (error?.response?.status === 401 && !config?.sent) {
      console.log('interceptor4')
      config.sent = true
      const data = await axios.post('http://localhost:8000/user/refresh', {
        withCredentials: true
      })
      console.log('Here data')
      console.log(data)

      console.log('interceptor6')
      config.headers = {
        ...config.headers
      }
      console.log(config)

      return await axios(config)
    }
    console.log('interceptor5')

    return await Promise.reject(error)
  }
)
