/* eslint-disable prettier/prettier */

import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @Length(3, 15)
  @IsString()
  personName: string;
  @IsNotEmpty()
  @IsString()
  personGender: string;
  @IsNotEmpty()
  @IsString()
  personAddress: string;
  @IsNotEmpty()
  @IsString()
  personMobileNo: string;
  @IsNotEmpty()
  dateOfBirth: Date;
}
