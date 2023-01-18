import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
/* eslint-disable indent */
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(['Male', 'Female'])
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  mobileNo: string;

  @IsNotEmpty()
  birth: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(18)
  age: number;
}
