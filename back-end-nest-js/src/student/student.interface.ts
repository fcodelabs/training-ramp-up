export interface StudentType {
  id?: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dob: Date;
}

export interface UpdateStudentType {
  id: number;
  name?: string;
  gender?: string;
  address?: string;
  mobileNo?: string;
  dob?: Date;
}
