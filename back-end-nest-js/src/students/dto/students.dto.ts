/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsDate, Length, IsInt, IsNumberString } from 'class-validator';

export class CreateStudentDto {
  
  @IsNotEmpty()
  @IsString()
  @Length(3,20)
  name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  @Length(5)
  address: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(10,10)
  mobileNo: string;
  
  @IsNotEmpty()
  @IsDate()
  dob: Date;
}

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsString()
  @Length(3,20)
  name: string;

  @IsString()
  gender: string;

  @IsString()
  @Length(5)
  address: string;

  @IsNumberString()
  @Length(10,10)
  mobileNo: string;
  
  @IsDate()
  dob: Date;
}
