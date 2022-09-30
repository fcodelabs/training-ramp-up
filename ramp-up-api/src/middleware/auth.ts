const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      if (token == null) res.sendStatus(401);

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (email) => {
        req.email = email;
        console.log('testMW');
        next();
      });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
  }
};
