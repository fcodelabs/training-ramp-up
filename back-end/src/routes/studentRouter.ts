const expresss = require("express");
const studentController = require("../controllers/studentController");
const router = expresss.Router();

router.get("/register", studentController.test);

module.exports = router;
