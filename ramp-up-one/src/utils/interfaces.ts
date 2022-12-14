export interface StudentModel {
  // [x: string]: any;
  id?: number;
  name?: string;
  gender?: string;
  address?: string;
  mobileNo?: string;
  birth?:  Date |string;
  age?: number;
  inEdit?: boolean | string;
  Discontinued?: boolean;
}
