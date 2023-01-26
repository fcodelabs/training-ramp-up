import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/student',
})
export async function resolver(axiosResponse: any) {
  try {
    const response = await axiosResponse
    return response
  } catch (e: any) {
    const response = e.response
    return [408, 'connectiion error']
  }
}
