import { User } from '../entity/User';
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

export const postUser = async (req, res) => {
  console.log(req.body);

  try {
    const accessToken = jwt.sign(
      req.body.email,
      process.env.ACCESS_TOKEN_SECRET,
      // { expiresIn: '1h' },
    );
    const refeshToken = jwt.sign(req.body.email, process.env.RE_TOKEN_KEY);

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { name, email } = req.body;
    const user = User.create({
      name: name,
      email: email,
      password: hash,
      role: 'User',
    });
    await user.save();
    return res.json(user).status(200);
  } catch (e) {
    console.log(e);
  }

  //return res.status(200);
};

// export const getUser = async (req, res) => {
//   try {
//     const user = await User.find();
//     console.log(user);
//     res.send(user);
//   } catch (e) {
//     console.log(e);
//   }
// };

export const findUser = async (req, res) => {
  try {
    const user = await User.findOneBy({ email: req.query.email });
    console.log('USERDETAILS', user);
    if (user) {
      const value = await bcrypt.compare(req.query.password, user.password);
      console.log(value);
      if (value) {
        return res.send({
          user: user,
          accessToken: jwt.sign(
            req.query.email,
            process.env.ACCESS_TOKEN_SECRET,
          ),
        });
      } else {
        console.log('Password not match');
      }
    } else {
      console.log('User not here', user);
    }
  } catch (e) {
    console.log(e);
  }
};
