/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express';
import dataSource from '../config/dataSource';
import { User } from '../models/user';
import transporter from '../config/mailer';
import type nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const createUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const { name, email, role } = request.body;
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser !== null) {
      response.status(400).json({ message: 'Email already registered' });
    } else {
      const token = jwt.sign({ email, role }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
      const newUser = userRepository.create({ name, email, role, token });
      await sendPaasswordCreationEmail(email, token);
      await userRepository.save(newUser);
      response.status(201).json(newUser);
    }
  } catch (error) {
    console.log('Error saving user:', error);
    response.status(500).json({ message: 'Error saving user' });
  }
};

export async function registeredEmailCheck(req: Request, res: Response): Promise<void> {
  try {
    const userRepository = dataSource.getRepository(User);
    const email = req.params.email;
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser === null) {
      res.status(200).json({ registeredEmail: false });
    } else {
      res.status(200).json({ registeredEmail: true });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ message: 'Error checking email registration' });
  }
}

async function sendPaasswordCreationEmail(email: string, token: string): Promise<void> {
  const frontendUrl = process.env.FRONTEND_URL;
  const mailOptions: nodemailer.SendMailOptions = {
    from: 'rampup@rampup.com',
    to: email,
    subject: 'Create your password',
    html: `<p>Hi to finish setting up your Ramp-Up acoount, click the link to create a password</p>
    <a href="${frontendUrl}/password-creation?token=${token}">Click here</a>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export const createPassword = async (req: Request, res: Response): Promise<void> => {
  const { token, password } = req.body;
  try {
    let email = '';
    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET ?? '');
      email = decodedToken.email;
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email, token } });
    if (user === null) {
      res.status(404).json({ message: 'User not found' });
    } else {
      user.password = await bcrypt.hash(password, 10);
      user.active = true;
      user.token = '';
      await userRepository.save(user);
      res.status(201).json({ message: 'Password created' });
    }
  } catch (error) {
    console.error('Error creating password:', error);
    res.status(500).json({ message: 'Error creating password' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (user === null) {
      res.status(404).json({ userDetails: null });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword && user.active) {
        const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
        res.cookie(user.email, token, {
          path: '/',
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
          sameSite: 'lax'
        });
        const userDetails = { id: user.id, name: user.name, email: user.email, role: user.role, active: user.active };
        res.status(200).json({ userDetails });
      } else {
        res.status(401).json({ userDetails: null });
      }
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ userDetails: null });
  }
};

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  const cookie = req.headers.cookie as string;
  const token = cookie.split('=')[1];
  if (token === null) {
    res.status(401).json({ userDetails: null });
  } else {
    let email = '';
    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET ?? '');
      email = decodedToken.email;
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });
      if (user === null) {
        res.status(404).json({ userDetails: null });
      } else {
        const { password, token, ...userDetails } = user;
        res.status(200).json({ userDetails });
      }
    } catch (error) {
      res.status(401).json({ userDetails: null });
    }
  }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, role, active } = req.body;
  try {
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser !== null) {
      res.status(400).json({ message: 'Email already registered' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepository.create({ email, password: hashedPassword, name, role, active });
      await userRepository.save(newUser);
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const oneUser = async (request: Request, response: Response): Promise<void> => {
  const id = parseInt(request.params.id);
  try {
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    if (user === null) {
      response.status(404).json({ message: 'User not found' });
    } else {
      response.status(200).json(user);
    }
  } catch (error) {
    console.log('Error fetching user:', error);
    response.status(500).json({ message: 'Error retrieving user dtails' });
  }
};

export const allUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    const userRepository = dataSource.getRepository(User);
    const users = await userRepository.find();
    response.status(200).json(users);
  } catch (error) {
    console.log('Error fetching users:', error);
    response.status(500).json({ message: 'Error retrieving user data' });
  }
};

export const removeUser = async (request: Request, response: Response): Promise<void> => {
  const id = parseInt(request.params.id);

  try {
    const userRepository = dataSource.getRepository(User);
    const userToRemove = await userRepository.findOneBy({ id });

    if (userToRemove === null) {
      response.status(404).json({ message: 'user not found' });
    } else {
      await userRepository.remove(userToRemove);
      response.status(200).json(userToRemove);
    }
  } catch (error) {
    console.log('Error removing user:', error);
    response.status(500).json({ message: 'Error removing user' });
  }
};

export const updateUser = async (request: Request, response: Response): Promise<void> => {
  const id = parseInt(request.params.id);
  const { name, email, role, password, active } = request.body;

  try {
    const userRepository = dataSource.getRepository(User);
    const userToUpdate = await userRepository.findOneBy({ id });
    if (userToUpdate === null) {
      response.status(404).json({ message: 'User not found' });
    } else {
      const updatedUser = Object.assign(new User(), {
        id,
        name,
        email,
        role,
        password,
        active
      });
      await userRepository.save(updatedUser);
      response.status(201).json(updatedUser);
    }
  } catch (error) {
    console.log('Error updating user:', error);
    response.status(500).json({ message: 'Error updating user details' });
  }
};
