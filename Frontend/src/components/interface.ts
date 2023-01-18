export interface User {
  ID: number;
  Name: string;
  Gender: string;
  Address: string;
  Mobile: string;
  DOB: Date;
  Age: number;
  inEdit?: boolean | string;
}

export interface Student {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: string;
  birthday: Date;
  age: number;
  inEdit?: boolean | string;
}
