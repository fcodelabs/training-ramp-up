/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import dataSource from '../config/dataSource';
import { User } from '../models/user';
import transporter from '../config/mailer';
import type nodemailer from 'nodemailer';

export const createUser = async (request: Request, response: Response): Promise<void> => {
  try {
    const { name, email, role } = request.body;
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser !== null && existingUser.active) {
      response.status(400).json({ message: 'Email already registered' });
    } else if (existingUser !== null && !existingUser.active) {
      const token = jwt.sign({ email, role }, process.env.JWT_SECRET ?? '', { expiresIn: '1h' });
      existingUser.name = name;
      existingUser.role = role;
      existingUser.token = token;
      await sendPaasswordCreationEmail(email, token);
      await userRepository.save(existingUser);
      response.status(201).json(existingUser);
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
    } else if (!existingUser.active) {
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
    const cookies = req.cookies;
    for (const name in cookies) {
      res.clearCookie(name, { path: '/' });
    }
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (user === null) {
      res.status(404).json({ userDetails: null });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword && user.active) {
        const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET ?? '', { expiresIn: '61m' });
        res.cookie(user.email, token, {
          path: '/',
          expires: new Date(Date.now() + 1000 * 60 * 60),
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

export const getVerifiedUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body.user;
    const userDetails = { id: user.id, name: user.name, email: user.email, role: user.role, active: user.active };
    res.status(200).json({ userDetails });
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ userDetails: null });
  }
};


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, role, active } = req.body;
  try {
    const userRepository = dataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser !== null) {
      res.status(400).json({ message: 'Email already registered' });
    } else if (email === '' || password === '' || name === '' || role !== 'Observer' || active !== '') {
      res.status(400).json({ message: 'Invalid input' });
    } else {
      console.log(email, password, name, role, active);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepository.create({ email, password: hashedPassword, name, role, active, token: '' });
      await userRepository.save(newUser);
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const cookies = req.cookies;
    for (const name in cookies) {
      res.clearCookie(name, { path: '/' });
    }
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
};

