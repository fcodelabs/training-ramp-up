import { StudentData } from "./studentDetails";

let data = [...StudentData];
const current = new Date();
const today = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.studentID), 0) + 1;

export const insertStudent = (student) => {
  if (!student.studentName) {
    console.log("Name ", student.studentName);
    alert("Name Required");
  } else if (!student.studentGender) {
    alert("Gender Required");
  } else if (
    student.studentGender !== "Male" &&
    student.studentGender !== "Female"
  ) {
    alert("Gender is wrong");
  } else if (!student.studentAddress) {
    alert("Address Required");
  } else if (
    !student.studentMobile ||
    student.studentMobile.length !== 10 ||
    isNaN(student.studentMobile)
  ) {
    alert("Please Enter Valid Mobile No");
  } else if (
    !student.studentDOB ||
    student.studentDOB === "" ||
    student.studentDOB >= today
  ) {
    alert("Please Enter Correct Date of Birth");
  } else {
    student.studentID = generateId(data);
    const age = current.getFullYear() - student.studentDOB.getFullYear();
    student.studentAge = age;
    student.inEdit = false;
    data.unshift(student);
  }
  return data;
};
export const getStudent = () => {
  return data;
};

export const updateStudent = (student) => {
  let index = data.findIndex(
    (record) => record.studentID === student.studentID
  );
  data[index] = student;
  return data;
};
