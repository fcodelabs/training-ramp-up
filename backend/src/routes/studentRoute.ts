import express, { Router } from "express";
import { StudentController } from "../controllers/studentController";
import { authenticateUser } from "../middlewares/expressValidator/authenticateUser";
import { authAdmin } from "../middlewares/roleValidator/authAdmin";

// const router = express.Router();

// // Create a new student
// router.post("/add", StudentController.addNewStudentController);
// router.get("/allStudents", StudentController.getAllStudentsController);
// router.put("/edit/:id", StudentController.editStudentController);
// router.delete("/delete/:id", StudentController.deleteStudentController);

// export default router;

function socketRouter(io: any): Router {
  const router = Router();

  router.post("/add", authenticateUser, authAdmin, async (req, res) => {
    try {
      await StudentController.addNewStudent(req, res).then(() => {
        io.emit("new-student", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.get("/allStudents", async (req, res) => {
    try {
      await StudentController.getAllStudents(req, res).then(() => {
        io.emit("get-all-students", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.put("/edit/:id", authenticateUser, authAdmin, async (req, res) => {
    try {
      await StudentController.editStudent(req, res).then(() => {
        io.emit("edit-student", res.statusCode);
      });
    } catch (error) {
      console.error(error);
    }
  });

  router.delete(
    "/delete/:id",
    authenticateUser,
    authAdmin,
    async (req, res) => {
      try {
        await StudentController.deleteStudent(req, res).then(() => {
          io.emit("delete-student", res.statusCode);
        });
      } catch (error) {
        console.error(error);
      }
    },
  );

  return router;
}

export default socketRouter;
