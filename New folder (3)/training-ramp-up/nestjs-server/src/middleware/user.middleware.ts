/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken');
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
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('first', decode);

    if (decode) {
      req.id = decode;
      next();
    }
  } else {
    res.sendStatus(401);
  }
};
