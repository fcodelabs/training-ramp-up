/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from '../../types/role';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @IsEnum([Role.ADMIN, Role.GUEST, Role.EDITOR])
  role: Role;
}
