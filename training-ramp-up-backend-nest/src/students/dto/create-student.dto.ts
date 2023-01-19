import { IsString,IsDate,IsNumber,IsNotEmpty } from 'class-validator';
//import { IsNotEmpty } from 'class-validator/types/decorator/decorators';

export class CreateStudentDto {

  @IsNumber()
  id: number;
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
