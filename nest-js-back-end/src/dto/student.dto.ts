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
  @IsNumberString()
  @MinLength(9)
  @MaxLength(10)
  mobile: number;

  @IsNotEmpty()
  @IsDateString()
  birthday: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  age: number;
}
