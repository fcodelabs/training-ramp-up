interface StudentType {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: number;
  birthday: string;
  age: number;
}

export interface GetStudentType {
  students: Array<StudentType>;
  err: string;
}
