export interface StudentInterface {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: number;
  birthday: string;
  age: number;
}

export interface GetStudentsType {
  students: Array<StudentInterface>;
  err: string;
}
