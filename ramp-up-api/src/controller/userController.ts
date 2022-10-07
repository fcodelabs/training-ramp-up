import { findUser, postUser } from '../service/userService';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export const logUser = async (req, res) => {
  try {
    const user = await findUser(req);

    console.log('user console role', user.user.role);
    if (!user) return res.json('Error First').status(400);
    return res.send({
      user: user.user,
      accessToken: jwt.sign(
        { id: user.id, role: user.user.role },
        process.env.TOKEN_KEY,
      ),
    });
  } catch (error) {
    console.log('login controller error', error);
  }
};

export const signupUser = async (req, res) => {
  try {
    const user = await postUser(req);
    if (!user) return res.json('Error User SignUp').status(400);
    return res.send(user);
  } catch (error) {
    console.log('SignUp Error', error);
  }
};
