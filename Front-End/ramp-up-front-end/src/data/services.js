//import { StudentData } from "./studentDetails";
import axios from "axios";

//let data = [...StudentData];
let data = [];
const current = new Date();

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const insertStudent = async (student) => {
  console.log(student.dataItem.birthday);
  if (!student.dataItem.name) {
    alert("Name Required");
  } else if (!student.dataItem.gender) {
    alert("Gender Required");
  } else if (student.dataItem.gender === "") {
    alert("Gender is wrong");
  } else if (!student.dataItem.address) {
    alert("Address Required");
  } else if (
    !student.dataItem.mobile ||
    isNaN(student.dataItem.mobile) ||
    student.dataItem.mobile.length !== 10
  ) {
    alert("Please Enter valid Mobile Number");
  } else if (!student.dataItem.birthday) {
    alert("Date of Birth Required");
  } else {
    student.id = generateId(data);
    const studentAge =
      current.getFullYear() - student.dataItem.birthday.getFullYear();
    student.dataItem.age = studentAge;
    if (studentAge <= 0) {
      alert("Please Enter Correct Date of Birth");
    } else {
      student.inEdit = false;
      data.unshift(student.dataItem);
      const responseData = await axios.post(
        "http://localhost:8000/student",
        student.dataItem
      );
      return responseData;
    }
  }
};
export const getStudent = async () => {
  try {
    const response = await axios.get("http://localhost:8000/student");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateStudent = async (student) => {
  const studentAge =
    current.getFullYear() - new Date(student.birthday).getFullYear();

  if (student.id === "") {
    alert("Name cannot be Null");
  } else if (student.gender === "") {
    alert("Gender is Wrong");
  } else if (student.address === "") {
    alert("Address cannot be Null");
  } else if (isNaN(student.mobile)) {
    alert("Mobile Number is Wrong");
  } else if (studentAge <= 0) {
    alert("Enter valid Date of Birth");
  } else {
    const response = await axios.put(
      `http://localhost:8000/student/${student.id}`,
      student
    );
    return response;
  }
};

export const deleteStudent = (student) => {
  try {
    const response = axios.delete(
      `http://localhost:8000/student/${student.id}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
