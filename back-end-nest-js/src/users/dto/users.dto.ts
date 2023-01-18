export class CreateUserDto {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}
