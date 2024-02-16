import express, { Router } from "express";
import { AuthController } from "../controllers/authController";

function socketAuthRouter(io: any): Router {
  const router = Router();

  router.post("/login", async (req, res) => {
    try {
      await AuthController.login(req, res).then(() => {
        io.emit("login", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/register", async (req, res) => {
    try {
      await AuthController.registerUser(req, res).then(() => {
        io.emit("register", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/logout", async (req, res) => {
    try {
      await AuthController.logout(req, res).then(() => {
        io.emit("logout", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/verify", async (req, res) => {
    try {
      await AuthController.verifyUser(req, res).then(() => {
        io.emit("verify", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.post("/refresh", async (req, res) => {
    console.log("refresh route");
    try {
      await AuthController.refreshToken(req, res).then(() => {
        io.emit("refresh", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  return router;
}

export default socketAuthRouter;
