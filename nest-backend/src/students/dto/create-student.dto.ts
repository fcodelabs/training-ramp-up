import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  mobile: string;
  @IsNotEmpty()
  dob: Date;
  @IsNotEmpty()
  age: number;
}
