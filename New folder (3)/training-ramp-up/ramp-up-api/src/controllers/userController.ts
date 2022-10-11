import { query } from 'express';
import { User } from '../entity/User';
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
import { loginUser, registerUser } from '../services/userService';

export const login = async (req, res) => {
  const userDetails = req.query;
  try {
    const user = await loginUser(userDetails);
    console.log('User', user.user.role);
    if (!user) return res.json('Error User login').status(400);
    return res.send({
      user: user.user,
      accessToken: jwt.sign(
        { user: user.id, role: user.user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '24h',
        },
      ),
      refreshToken: jwt.sign(user.id, process.env.RE_TOKEN_KEY),
    });
  } catch (error) {
    console.log('login controller error', error);
  }
};

export const signup = async (req, res) => {
  const userDetails = req.body;

  try {
    const user = await registerUser(userDetails);

    if (!user) return res.json('Error User SignUp').status(400);
    return res.send(user);
  } catch (error) {
    console.log('SignUp Error', error);
  }
};
