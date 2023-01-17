export class CreateUserDto {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
