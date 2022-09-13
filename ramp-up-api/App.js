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

//Update the student detail
router.put("/:Id", (req, res) => {
	const id = req.params.Id;
	const student = req.body;
	const currentStudent = students.filter((x) => x.ID == id)[0];
	if (currentStudent) {
		const isValid = ValidateStudent(student);
		if (isValid == "") {
			currentStudent.StudentName = student.StudentName;
			currentStudent.Gender = student.Gender;
			currentStudent.Address = student.Address;
			currentStudent.MobileNo = student.MobileNo;
			currentStudent.DOB = student.DOB;
			res.status(200).send(students);
		} else {
			res.statusMessage = isValid;
			res.sendStatus(404);
		}
	} else {
		res.statusMessage = "Student does not exist";
		res.sendStatus(404);
	}
});

