import express, { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateUser } from "../middlewares/expressValidator/authenticateUser";
import { authAdmin } from "../middlewares/roleValidator/authAdmin";

// const userRouter = express.Router();
// console.log("hello in user router");

// // Create a new student
// userRouter.post(
//   "/create",
//   authenticateUser,
//   authAdmin,
//   UserController.createUser,
// );
// userRouter.post("/create-password/:token", UserController.createPassword);

// export default userRouter;

function sockeUsertRouter(io: any): Router {
  const router = Router();

  router.post("/create", authenticateUser, authAdmin, async (req, res) => {
    try {
      await UserController.createUser(req, res).then(() => {
        io.emit("new-user", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/create-password/:token", async (req, res) => {
    try {
      await UserController.createPassword(req, res).then(() => {
        io.emit("create-password", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  return router;
}

export default sockeUsertRouter;
