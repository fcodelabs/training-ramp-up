export default interface UserModel {
  id?: number
  userName: string
  email: string
  password: string
  confirmPassword?: string
  role: string
}

export interface JwtPayload {
  id?: number
  userName: string
  email: string
  password: string
  role: string
}
