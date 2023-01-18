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
