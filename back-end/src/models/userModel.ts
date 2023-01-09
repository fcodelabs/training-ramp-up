export default interface UserModel {
  id?: number
  userName: string
  email: string
  password: string
  confirmPassword?: string
  role: string
}

export interface JwtPayloadUser {
  id?: number
  userName: string
  email: string
  password: string
  role: string
}
export interface JwtPayload {
  user: JwtPayloadUser
}
