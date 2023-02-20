export function accessTokenExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['accessToken'];
  }
  return token;
}

export function refreshTokenExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['refreshToken'];
  }
  return token;
}
