import { Student } from '../../utils/interfaces'
import { axiosClient, resolver } from '../client'

interface userResponse {
  email: string
  password: string
}

export default {
  signUp(user: userResponse) {
    return resolver(axiosClient.post('user/signup', user))
  },
}
