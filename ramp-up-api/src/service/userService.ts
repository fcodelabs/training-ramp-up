// const jwt = require('jsonwebtoken');
// import { User } from '../entity/User';
// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// export async function loginUser(data) {
//   const user = await User.find();
//   return user;
// }

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
