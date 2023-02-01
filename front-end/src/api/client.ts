import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/student',
})
export async function resolver(axiosResponse: any) {
  const response = await axiosResponse
  return response
}
