export class CreateStudentDto {
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dob: Date;
}

export class UpdateStudentDto {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dob: Date;
}
