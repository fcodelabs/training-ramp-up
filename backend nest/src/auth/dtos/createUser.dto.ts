/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  Email: string;
  @IsNotEmpty()
  @IsString()
  Password: string;
  @IsNotEmpty()
  @IsString()
  @IsEnum(['admin', 'guest', 'editor'])
  Role: string;
  
}
