const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (
  req: { headers: { authorization: string }; email: any },
  res: { sendStatus: (arg0: number) => void },
  next: () => void
) {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (token == null) res.sendStatus(401);
      console.log("TokenV", token);
      const userData =jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

console.log("I am from userAuth", userData);
if(userData){
  next();
}
      //   , (email: any) => {
      //   req.email = email;
      //   next();
      // });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(e);
  }
};
