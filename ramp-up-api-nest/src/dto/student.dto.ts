import { IsString, IsNotEmpty, IsEnum, Matches } from 'class-validator';

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
  @IsString()
  @Matches('^[0-9]{10}$')
  number: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$')
  birthday: string;
}
