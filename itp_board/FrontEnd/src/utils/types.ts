import {SortDescriptor} from "@progress/kendo-data-query";


export type UserInitialState = {
  firstName:string;
  lastName: string;
  email:string;
  admin:boolean;
  signIn:boolean;
}

export type StudentInitialState = {
  editId: number | null;
  dataFetchingRequested: boolean
  data: Student[];
  dataEditingRequested: boolean;

  dataAddRequested: boolean;
  dataRemoveRequested:boolean;
  sort: Array<SortDescriptor>;
  newAdded: boolean
}

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
