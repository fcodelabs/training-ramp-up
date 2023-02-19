const expresss = require("express");
const studentController = require("../controllers/studentController");
const router = expresss.Router();
const verifyJWTs = require("../middlewares/verifyJWT");

router.get("/", verifyJWTs, studentController.getStudents);
router.post("/", studentController.addStudent);
router.patch("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
