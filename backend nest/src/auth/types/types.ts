/* eslint-disable prettier/prettier */
import { Role } from 'src/types/role';
export type CreateUserParams = {
  Email: string;
  Password: string;
  Role: Role;
};

export type loginOutput = {
  accessToken: string;
  user: {
    Role: Role;
    Email: string;
  };
};

export interface message {
  message: string;
}
