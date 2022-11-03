import { Request, Response } from "express";
import {
  createUserService,
  loginUserService,
  createToken,
} from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;

    const user = await createUserService({
      name,
      email: email.toLowerCase(),
      password,
    });

    if (user) {
      if (!("err" in user)) {
        const newToken = createToken(user);
        res.cookie("accessToken", newToken.newAccessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });
        res.cookie("refreshToken", newToken.newRefreshToken, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true,
        });
        res.cookie("logedUser", newToken.dataStoredInToken, {
          maxAge: 60 * 60 * 1000,
        });

        console.log("acctoken", newToken.newAccessToken);
        console.log("refrhtoken", newToken.newRefreshToken);

        res.status(200);
        res.json(user);
        return;
      }
    }
  } catch (err) {
    console.log("Register User Error", err);
    res.status(400);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const user = await loginUserService({
      email: email.toLowerCase(),
      password,
    });

    if (user) {
      if (!("err" in user)) {
        const newToken = createToken(user);
        res.cookie("accessToken", newToken.newAccessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });
        res.cookie("refreshToken", newToken.newRefreshToken, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true,
        });
        res.cookie("logedUser", newToken.dataStoredInToken, {
          maxAge: 60 * 60 * 1000,
        });

        console.log("acctoken", newToken.newAccessToken);
        console.log("refrhtoken", newToken.newRefreshToken);

        res.status(200);
        res.json(user);
        return;
      }
    }
  } catch (err) {
    console.log("Login User Error", err);
    res.status(400);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.cookie("accessToken", "", {
      maxAge: -1,
      httpOnly: true,
    });
    res.cookie("refreshToken", "", {
      maxAge: -1,
      httpOnly: true,
    });
    res.cookie("logedUser", "", {
      maxAge: -1,
    });
    res.status(200).json({
      status: "Successfully logged out",
    });
  } catch (err) {
    console.log("Logout User Error ", err);
    res.status(400);
  }
};
