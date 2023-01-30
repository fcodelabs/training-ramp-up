export interface StudentModel {
  [x: string]: any;
  status?: number;
  data?: any;
  // [x: string]: any;
  id?: number;
  name?: string;
  gender?: string;
  address?: string;
  mobileNo?: string;
  birth?:  Date   ;
  age?: number;
  inEdit?: boolean | string ;
  Discontinued?: boolean;
}
export interface UpdatedPerson {
  id: number;
  name?: string;
  gender?: string;
  address?: string;
  mobileNo?: string;
  dob?: Date | undefined;
}

export interface LoginDetails {
  userRoll?: any;
  data?: any;
  status?: number;
  email: string;
  name?: string;
  password?: string;
  
}
