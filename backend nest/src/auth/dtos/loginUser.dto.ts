/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

