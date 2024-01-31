//src/routes/studentRoutes.ts
import express,{Router} from 'express';
import { createStudent, getStudents, updateStudent } from '../controllers/Student';
import { createStudentValidation } from '../middlewares/expressValidator/createStudentValidation';
import { deleteStudent } from '../controllers/Student';

const router = express.Router();



router.get('/', getStudents);
router.post('/', createStudentValidation, createStudent);
router.put('/:id', createStudentValidation, updateStudent);
router.delete('/:id', deleteStudent);




function socketRouter(io:any): Router {
    const router = Router();
  
    router.post("/", async (req, res) => {
      try {
        await createStudent(req, res).then(() => {
          io.emit("newstudent", res.statusCode);
        });
      } catch (error) {
        console.error(error);
      }
    });
  
    router.get("/", async (req, res) => {
      try {
        await getStudents(req, res).then(() => {
          io.emit("getstudents", res.statusCode);
        });
      } catch (error) {
        console.error(error);
      }
    });
  
    router.put("/:id", async (req, res) => {
      try {
        await updateStudent(req, res).then(() => {
          io.emit("editstudent", res.statusCode);
        });
      } catch (error) {
        console.error(error);
      }
    });
  
    router.delete("/:id", async (req, res) => {
      try {
        await deleteStudent(req, res).then(() => {
          io.emit("deletestudent", res.statusCode);
        });
      } catch (error) {
        console.error(error);
      }
    });
  
    return router;
  }
  
  export default socketRouter;