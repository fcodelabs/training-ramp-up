export type User = {
  id: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dateOfBirth: Date | null
}

export type Res = {
address:string
dateOfBirth:string
gender:string
id:string
mobileNo:string
name: string
}

export type PageState = {
  skip:number;
  take:number;
}