/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export const VerfiyRefreshToken = (token: string, userEmail: string) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
    const { email } = decoded as any;
    return email === userEmail;
  } catch (err) {
    return false;
  }
};
