/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  // id: string;
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
  // role: string;
}
