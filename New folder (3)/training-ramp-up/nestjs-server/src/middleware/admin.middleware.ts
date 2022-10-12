/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwtToken = require('jsonwebtoken');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// import { Request, Response, NextFunction } from 'express';

export default function AdminMiddleware(req, res, next) {
  let token;
  console.log('res', req);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log('TOKEN', token);
    if (token == null) res.sendStatus(401);
    const decode = jwtToken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Token Decode', decode.role);
    if (decode.role == 'Admin') {
      next();
    }
    if (decode.role == 'User' && req.method == 'GET') {
      next();
    } else {
      console.log('CHECKIGN');
    }
  } else {
    res.sendStatus(401);
  }
}
