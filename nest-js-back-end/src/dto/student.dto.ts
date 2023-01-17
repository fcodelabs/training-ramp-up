/* eslint-disable indent */
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class StudentDto {
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
  // @IsDateString()
  birth: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  age: number;
}
