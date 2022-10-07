import { User } from '../entity/User';
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function loginUser(details) {
  try {
    const user = await User.findOneBy({ email: details.email });

    if (!user) {
      console.log('User not found');
    } else {
      const value = await bcrypt.compare(details.password, user.password);
      console.log(value);
      if (!value) {
        console.log('Password not match');
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
    const checkUser = await User.findOneBy({ email: details.email });

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

      return user;
    } else {
      return { error: 'user was here' };
    }
  } catch (error) {
    console.log('Register Error', error);
  }
}
