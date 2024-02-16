import AppDataSource from '../dataSource';
import { Users } from '../models/user';
import { type Request, type Response } from 'express';
import { sendMail, transporter } from '../sendEmails';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const emailSend = async (req: Request, res: Response): Promise<void> => {
  const { email, role, name } = req.body;

  try {
    if (name != null && role != null && email != null) {
      const tempToken = jwt.sign({ email, role }, SECRET_KEY, {
        expiresIn: '1h'
      });

      const userRepo = AppDataSource.getRepository(Users);
      const selectedUser = await userRepo.findOne({
        where: { email }
      });

      const tempPassword = process.env.TEMP_PASSWORD!;
      const hashedTempPassword = await bcrypt.hash(tempPassword, 10);
      if (selectedUser === null) {
        const newUser = {
          name,
          email,
          role,
          password: hashedTempPassword,
          tempToken
        };

        const createdUser = userRepo.create(newUser);
        await userRepo.save(createdUser);
      } else {
        if (selectedUser != null) {
          res
            .status(404)
            .json({ error: 'email already exists', isVerified: true });
          return;
        }
        userRepo.merge(selectedUser, { tempToken });
        await userRepo.save(selectedUser);
      }

      await sendMail(
        transporter,
        email as string,
        role as string,
        name as string,
        tempToken
      );
      res.status(200).json({
        message: 'Signup link sent successfully',
        tempToken
      });
    } else {
      res.status(400).json({ error: 'Invalid request parameters' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { password, token } = req.body;
  // console.log(password);
  // console.log(token);
  try {
    const decodedToken: any = jwt.verify(token as string, SECRET_KEY);
    const userRepo = AppDataSource.getRepository(Users);
    const selectedUser = await userRepo.findOne({
      where: { email: decodedToken.email }
    });

    if (
      selectedUser === null ||
      (await selectedUser.compareTempToken(token as string)) === null
    ) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password as string, 10);
    selectedUser.password = hashedPassword;
    selectedUser.tempToken = '';

    await userRepo.save(selectedUser);

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
