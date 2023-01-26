export interface User {
  id: number
  name?: string
  gender?: string
  address?: string
  mobile?: string
  dob?: string
  age?: number
  inEdit?: boolean | string
}

export interface HomeState {
  home: {
    users: User[]
    error: string
    isLoading: boolean
  }
}