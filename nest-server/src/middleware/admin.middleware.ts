// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwtToken = require('jsonwebtoken');

export default function AdminMiddleware(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

    if (token == null) res.sendStatus(401);

    const decode = jwtToken.verify(token, 'udwd4545');
    if (decode.role == 'Admin') {
      next();
    }
  } else {
    res.sendStatus(401);
  }
}
