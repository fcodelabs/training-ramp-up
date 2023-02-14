/* eslint-disable prettier/prettier */
import { Request } from 'express';

export const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['refresh_token'];
  }
  return token;
};
