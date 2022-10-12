'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const jwt = require('jsonwebtoken');
function User(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    if (token == null) res.sendStatus(401);
    jwt.verify(token, 'udwd4545');
    next();
  } else {
    res.sendStatus(401);
  }
}
exports.default = User;
//# sourceMappingURL=user.middleware.js.map
