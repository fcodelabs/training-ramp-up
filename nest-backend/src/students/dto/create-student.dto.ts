import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

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
  @IsDate()
  dob: Date;
  @IsNotEmpty()
  @IsNumber()
  age: number;
}
