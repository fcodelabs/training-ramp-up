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
];


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


