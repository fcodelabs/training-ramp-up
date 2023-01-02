import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const GenerateTokens = async (email: string, role: string) => {
  try {
    const payload = {
      email: email,
      role: role,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as Secret, { expiresIn: '40m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: '50m' });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    console.log(err);
    return { err: 'Token generation failed' };
  }
};
