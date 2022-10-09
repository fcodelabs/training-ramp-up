import { postUser,findUser } from "../services/user.service";
require("dotenv").config();
export const registerUser = async (req: any, res: any) => {
  try {
    console.log("register user here", req.body);
    const userDetails = req.body;
    const user = await postUser(userDetails);
    console.log("I am coming from register user", user);
    //   const user = await postUser();
    //   // console.log("user", user);
    //   if (!user) return res.json("Error get Student").status(400);
    return res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const SignInUser = async (req: any, res: any) => {
  try {
     const loginDetails = req.query;
    const user = await findUser(loginDetails);
    console.log("User with token",user);
if (!user) return res.json("Error get Student").status(400);
     return res.send({
      user:user,
      accessToken :jwt.sign({user:user?.email, role:user?.role}, process.env.ACCESS_TOKEN_KEY)
     });
  } catch (error) {
    console.log(error);
  }
};
