let express = require("express");
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let port = process.env.port || 8000;
let router = express.Router();
app.use("/api/student", router);

app.listen(port, () => {
	console.log(`Node.js application running on port : ${port}`);
});

let students = [
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

	{
		ID: 3,
		StudentName: "Trudy",
		Gender: "Female",
		Address: "Gampaha",
		MobileNo: 077260325,
		DOB: "2001/08/15"
	},
];

//Get all students
router.get("/", (req, res) => {
	res.json(students);
});

//Get students by their id
router.get("/:Id", (req, res) => {
	let id = parseInt(req.params.Id);
	let currentStudent = students.filter((x) => x.ID == id)[0];
	if (currentStudent) {
		res.json(currentStudent);
	} else {
		res.sendStatus(404);
	}
});

ValidateStudent = (student) => {
	let message = "";
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

//Add new student
router.post("/", (req, res) => {
	let student = req.body;
	let isValid = ValidateStudent(student);
	if (isValid == "") {
		students.push(student);
		console.log(students);
		res.status(201).send(students);
	} else {
		res.statusMessage = isValid;
		res.sendStatus(404);
	}
});


//Update the student detail
router.put("/:Id", (req, res) => {
	let id = req.params.Id;
	let student = req.body;
	let currentStudent = students.filter((x) => x.ID == id)[0];
	if (currentStudent) {
		let isValid = ValidateStudent(student);
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

//Delete student
router.delete("/:Id", (req, res) => {
	let id = req.params.Id;
	let currentStudent = students.filter((x) => x.ID == id)[0];
	if (currentStudent) {
		students = students.filter((x) => x.ID!== id);
		console.log(students);
		res.statusMessage = "Student deleted sucessfully.";
		res.sendStatus(200);
	} else {
		res.statusMessage = "Student does not exist";
		res.sendStatus(404);
	}
});


