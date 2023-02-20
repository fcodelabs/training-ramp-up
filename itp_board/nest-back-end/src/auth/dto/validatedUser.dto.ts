import { AuthonticatedUserDto } from './authonticatedUser.dto';

export class ValidatedUserDto {
  data: AuthonticatedUserDto | null;
  authorized: boolean;
}
