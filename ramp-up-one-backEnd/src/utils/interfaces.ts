export interface StudentModel {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  birth: Date ;
  age: number;
}
export interface UserModel {
  id?: number;
  email: string;
  name?: string;
  password: string;
  userRoll: string;
}