export interface StudentInterface {
  id?: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dob: Date;
}

export interface UpdateStudentInterface {
  id: number;
  name?: string;
  gender?: string;
  address?: string;
  mobileNo?: string;
  dob?: Date;
}

export interface DeleteStudentInterface {
  raw: any;
  affected: number;
}
