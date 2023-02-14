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
  PersonID: number;
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
