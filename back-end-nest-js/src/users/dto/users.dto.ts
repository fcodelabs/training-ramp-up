/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3,20)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  @IsString()
  password: string;

  @IsString()
  @Length(8)
  @IsNotEmpty()
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsString()
  @Length(8)
  @IsNotEmpty()
  password: string;
}
