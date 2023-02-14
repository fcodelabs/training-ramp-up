/* eslint-disable prettier/prettier */
export type CreateUserParams = {
  Email: string;
  Password: string;
  Role: 'admin' | 'guest' | 'editor';
};
