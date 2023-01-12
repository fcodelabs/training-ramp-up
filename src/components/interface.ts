export interface User {
  ID: number
  Name: string
  Gender: string
  Address: string
  Mobile: string
  DOB: Date
  Age: number
  inEdit?: boolean | string
}
