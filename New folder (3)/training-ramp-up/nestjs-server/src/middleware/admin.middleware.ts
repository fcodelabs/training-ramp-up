/* eslint-disable prettier/prettier */
const jwtToken = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  let token;
  console.log('res', req.params.userId);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    if (token == null) res.sendStatus(401);
    const decode = jwtToken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Token Decode', decode.role);
    if (decode.role == 'Admin') {
      next();
    }
  } else {
    res.sendStatus(401);
  }
};
