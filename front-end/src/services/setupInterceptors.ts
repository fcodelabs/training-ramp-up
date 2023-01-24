/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

axiosInstance.interceptors.response.use(
  function (response) {
    console.log('hoooo1')
    return response
  },
  async function (error) {
    console.log('hoooo2222')
    console.log(error)
    const prevReq = error?.config
    if (error.response.status === 500) {
      console.log('hoooo2')
      await axios.post(
        'http://localhost:8000/user/refresh',
        {},
        { withCredentials: true }
      )
      prevReq.headers = {
        ...prevReq.headers
      }
      return await axiosInstance(prevReq)
    }
    return await Promise.reject(error)
  }
)

export default axiosInstance
