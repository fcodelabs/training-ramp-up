import { resolve } from 'path';
import { Users } from '../entity/Users';
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function findUser(req) {
  try {
    const user = await Users.findOneBy({
      email: req.query.email.toLowerCase(),
    });
    console.log('console checking service', user);
    if (!user) {
      console.log('User not here email');
    } else {
      const value = await bcrypt.compare(req.query.password, user.password);
      console.log('Value', value);
      if (!value) {
        console.log('User not here');
      } else {
        return { user: user, id: user.id };
      }
    }
  } catch (error) {
    return { msg: 'login sercive Error' };
  }
}

export async function postUser(data) {
  try {
    const checkUser = await Users.findOneBy({ email: data.email });
    console.log('Data', checkUser);
    if (checkUser == null) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(data.password, salt);

      const { name, email } = data;
      const user = await Users.save({
        name: name,
        email: email.toLowerCase(),
        password: hash,
        role: 'User',
      });

      // await user.save();
      return user;
    } else {
      console.log('User here');
      return { error: 'user was here' };
    }
  } catch (error) {
    console.log('Register Error', error);
  }
}
