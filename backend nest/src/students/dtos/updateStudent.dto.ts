/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateStudentDto } from './createStudent.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsNotEmpty()
  @IsNumber()
  PersonID: number;
}
