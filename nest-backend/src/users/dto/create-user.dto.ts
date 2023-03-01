import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;
}
