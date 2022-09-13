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


//Add new student
ValidateStudent = (student) => {
	const message = "";
	if (!student.ID) {
		message = "Student id is not found";
	}
	if (!student.StudentName) {
		message = "Student Name is not found";
	}

	if (!student.Gender) {
		message = "Student gender is not found";
	}

	if (!student.Address) {
		message = "Student Address is not found";
	}

	if (!student.MobileNo) {
		message = "Student MobileNo is is not found";
	}

	if (!student.DOB) {
		message = "Student date of birth is not found";
	}

	return message;
};

router.post("/", (req, res) => {
	const student = req.body;
	const isValid = ValidateStudent(student);
	if (isValid == "") {
		students.push(student);
		console.log(students);
		res.status(201).send(students);
	} else {
		res.statusMessage = isValid;
		res.sendStatus(404);
	}
});

