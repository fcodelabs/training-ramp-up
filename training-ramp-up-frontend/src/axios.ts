import axios from 'axios'

//base URL
const instance = axios.create({
    baseURL: 'http://localhost:4000/',
})
export default instance
