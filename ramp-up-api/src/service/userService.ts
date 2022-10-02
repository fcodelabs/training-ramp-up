const jwt = require('jsonwebtoken');
import { User } from '../entity/User';
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function loginUser(req) {
  try {
    const user = await User.findOneBy({ email: req.query.email });
    console.log('User', user);
    if (!user) {
      console.log('User not found');
    } else {
      const value = await bcrypt.compare(req.query.password, user.password);
      console.log(value);
      if (!value) {
        console.log('Password not match');
      } else {
        return user;
      }
    }
  } catch (error) {
    console.log('login sercive Error', error);
    return { error: 'login sercive Error' };
  }
}
export async function registerUser(req) {
  try {
    const checkUser = await User.findOneBy({ email: req.body.email });
    if (checkUser == null) {
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
      return user;
    } else {
      console.log('User here');
      return { error: 'user was here' };
    }
  } catch (error) {
    console.log('Register Error', error);
  }
}

// export async function signupuser(data) {
//   const accessToken = jwt.sign(
//     data.email,
//     process.env.ACCESS_TOKEN_SECRET,
//     // { expiresIn: '10s' },
//   );
//   const salt = bcrypt.genSaltSync(saltRounds);
//   const hash = bcrypt.hashSync(data.password, salt);
//   const { name, email } = data;
//   const user = User.create({
//     name: name,
//     email: email,
//     password: hash,
//   });
//   try {
//     await user.save();
//     return res.json({ accessToken: accessToken });
//   } catch (e) {
//     console.log(e);
//   }
// }
