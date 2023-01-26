

export type Student = {
  id: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dateOfBirth: string | null
}

export type SockeResponse = {
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


export type pageCallBack = (page:PageState)=>void

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
