import { SortDescriptor } from '@progress/kendo-data-query'

export type UserCredetial = {
  email: string
  password: string
  navigate: (to: string) => void
}

export type UserInitialState = {
  firstName: string
  lastName: string
  email: string
  admin: boolean
  signIn: boolean
}

export type StudentInitialState = {
  editId: number | null
  dataFetchingRequested: boolean
  data: Student[]
  dataEditingRequested: boolean

  dataAddRequested: boolean
  dataRemoveRequested: boolean
  sort: Array<SortDescriptor>
  newAdded: boolean
  editingFields: { [key: string]: any }
}

export type tempResp = {
  email: string
  firstName: string
  lastName: string
  admin: boolean
}

export type ResponseObj = {
  data: User
  authorized: boolean
  token: string
}
export type User = {
  email: string
  firstName: string
  lastName: string
  password: string
  admin: boolean
  navigate: (to: string) => void
}

export type Student = {
  id: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dateOfBirth: string | null
}

// export type SockeResponse = {
//   address: string
//   dateOfBirth: string
//   gender: string
//   id: string
//   mobileNo: string
//   name: string
// }

export type PageState = {
  skip: number
  take: number
}

export type pageCallBack = (page: PageState) => void

// export type Sort ={
// field:string;
//   dir:string;
// }

export type Person = {
  id: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dateOfBirth: string
}
