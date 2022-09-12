const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.port || 8000;
const router = express.Router();
app.use("/api/student", router);

app.listen(port, () => {
	console.log(`Node.js application running on port : ${port}`);
});

const students = [
	{
		ID: 1,
		StudentName: "Elizabeth",
		Gender: "Female",
		Address: "London",
		MobileNo: 225896344,
		DOB: "1926/04/21"
	},
	{
		ID: 2,
		StudentName: "Mahi",
		Gender: "Male",
		Address: "Colombo",
		MobileNo: 0115260325,
		DOB: "1996/11/04"
	},
];

//Get all students
router.get("/", (req, res) => {
	res.json(students);
});


