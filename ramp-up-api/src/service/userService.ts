import { Users } from '../entity/Users';
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

export const findUser = async (req, res) => {
  console.log('backedn request', req.query);
  const accessToken = jwt.sign(
    req.query.email,
    process.env.TOKEN_KEY,
    // { expiresIn: '10s' },
  );
  console.log('Users', Users);
  const user = await Users.findOneBy({ email: req.query.email });
  console.log('fund User ', user);

  if (user) {
    const value = await bcrypt.compare(req.query.password, user.password);
    if (value) {
      console.log('token', accessToken);
      return res.send({ user: user, accessToken: accessToken });
    } else {
      console.log('User not here');
    }
  } else {
    console.log('User not here');
  }
};

export const postUser = async (req, res) => {
  const { name, email } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = Users.create({
    name: name,
    email: email,
    password: hash,
  });
  await user.save();
  console.log(' Insert Item Dalin', user);
  res.json(user);
  return res.status(200);
};
