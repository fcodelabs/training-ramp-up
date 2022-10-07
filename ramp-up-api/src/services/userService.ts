const jwt = require('jsonwebtoken');
import { User } from '../entity/User';
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function loginUser(details) {
  try {
    const user = await User.findOneBy({ email: details.email });

    if (!user) {
      //console.log('User not found');
    } else {
      const value = await bcrypt.compare(details.password, user.password);
      console.log(value);
      if (!value) {
        //console.log('Password not match');
      } else {
        return { user: user, id: user.id };
      }
    }
  } catch (error) {
    return { error: 'login service Error' };
  }
}
export async function registerUser(details) {
  try {
    console.log('Details', details.email);
    const checkUser = await User.findOneBy({ email: details.email });
    console.log('check user', checkUser);
    if (checkUser == null) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(details.password, salt);

      const { name, email } = details;
      const user = User.save({
        name: name,
        email: email,
        password: hash,
        role: 'User',
      });

      //await user.save();
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
