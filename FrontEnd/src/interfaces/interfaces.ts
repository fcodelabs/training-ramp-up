export interface User {
  id: number
  name: string
  gender: string
  address: string
  mobile: string
  dob: string | Date
  age: number
  inEdit?: boolean | string
}

export interface HomeState {
  home: {
    users: User[]
    error: string
    isLoading: boolean
  }
}

export interface UserLogin{
  email: string,
  password: string
}

export interface UserSignUp{
  email: string,
  password: string
  confirmPassword: string
}