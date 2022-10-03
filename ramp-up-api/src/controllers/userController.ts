import { User } from '../entity/User';
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
import { loginUser, registerUser } from '../service/userService';

// export const postUser = async (req, res) => {
//   console.log(req.body);

//   try {
//     // const accessToken = jwt.sign(
//     //   req.body.email,
//     //   process.env.ACCESS_TOKEN_SECRET,
//     //   // { expiresIn: '1h' },
//     // );
//     // const refeshToken = jwt.sign(req.body.email, process.env.RE_TOKEN_KEY);

//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     const { name, email } = req.body;
//     const user = User.create({
//       name: name,
//       email: email,
//       password: hash,
//       role: 'User',
//     });
//     await user.save();
//     return res.json(user);
//   } catch (e) {
//     console.log('ERROR', e);
//   }

//   //return res.status(200);
// };

// export const getUser = async (req, res) => {
//   try {
//     const user = await User.find();
//     console.log(user);
//     res.send(user);
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const user = await User.findOneBy({ email: req.query.email });
//     console.log('USERDETAILS', user);
//     if (user) {
//       const value = await bcrypt.compare(req.query.password, user.password);
//       console.log(value);
//       if (value) {
//         return res.send({
//           user: user,
//           accessToken: jwt.sign(
//             req.query.email,
//             process.env.ACCESS_TOKEN_SECRET,
//           ),
//         });
//       } else {
//         console.log('Password not match');
//       }
//     } else {
//       console.log('User not here', user);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

export const login = async (req, res) => {
  try {
    const user = await loginUser(req);
    if (!user) return res.json('Error First').status(400);
    return res.send({
      user: user, //Todo -> remove password
      accessToken: jwt.sign(req.query.email, process.env.ACCESS_TOKEN_SECRET),
    });
  } catch (error) {
    console.log('login controller error', error);
  }
};

export const signup = async (req, res) => {
  try {
    const user = await registerUser(req);

    if (!user) return res.json('Error User SignUp').status(400);
    return res.send(user);
  } catch (error) {
    console.log('SignUp Error', error);
  }
};
