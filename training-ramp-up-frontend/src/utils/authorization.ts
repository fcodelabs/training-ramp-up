import axios from 'axios'

//base URL
const instance = axios.create({
    baseURL: 'http://localhost:4000/',
})

instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const prevReq = error?.config
        console.log(error)
        if (error.response.status == 403) {
            const acessToken = await axios.post(
                'http://localhost:4000/user/refresh',
                {},
                { withCredentials: true }
            )
            prevReq.headers = {
                ...prevReq.headers,
            }
            return instance(prevReq)
        }
        return Promise.reject(error)
    }
)

export default instance
