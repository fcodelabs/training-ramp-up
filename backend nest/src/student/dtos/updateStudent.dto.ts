/* eslint-disable prettier/prettier */
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { CreateStudentDto } from './createStudent.dto';

export class UpdateStudentDto {
  @IsNotEmpty()
  @IsNumber()
  personID: number;
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
