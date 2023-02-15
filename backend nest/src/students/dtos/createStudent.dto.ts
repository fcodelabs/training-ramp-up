/* eslint-disable prettier/prettier */

import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @Length(3, 15)
  @IsString()
  PersonName: string;
  @IsNotEmpty()
  @IsString()
  PersonGender: string;
  @IsNotEmpty()
  @IsString()
  PersonAddress: string;
  @IsNotEmpty()
  @IsString()
  PersonMobileNo: string;
  @IsNotEmpty()
  DateOfBirth: Date;
}
