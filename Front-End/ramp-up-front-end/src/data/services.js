import { StudentData } from "./studentDetails";

let data = [...StudentData];
const current = new Date();

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.studentID), 0) + 1;

export const insertStudent = (student) => {
  if (!student.studentName) {
    alert("Name Required");
  } else if (!student.studentGender) {
    alert("Gender Required");
  } else if (student.studentGender === "") {
    alert("Gender is wrong");
  } else if (!student.studentAddress) {
    alert("Address Required");
  } else if (
    !student.studentMobile ||
    student.studentMobile.length !== 10 ||
    isNaN(student.studentMobile)
  ) {
    alert("Please Enter Valid Mobile No");
  } else {
    student.studentID = generateId(data);
    const age = current.getFullYear() - student.studentDOB.getFullYear();
    student.studentAge = age;
    if (age <= 0) {
      alert("Please Enter Correct Date of Birth");
    } else {
      student.inEdit = false;
      data.unshift(student);
    }
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
  const age = current.getFullYear() - student.studentDOB.getFullYear();

  if (student.studentName === "") {
    alert("Name cannot be Null");
  } else if (student.studentGender === "") {
    alert("Gender is Wrong");
  } else if (student.studentAddress === "") {
    alert("Address cannot be Null");
  } else if (
    student.studentMobile.length !== 10 ||
    isNaN(student.studentMobile)
  ) {
    alert("Mobile Number is Wrong");
  } else if (age <= 0) {
    alert("Enter valid Date of Birth");
  } else {
    data[index] = student;
  }
  return data;
};

export const deleteStudent = (student) => {
  let index = data.findIndex(
    (record) => record.studentID === student.studentID
  );
  data.splice(index, 1);
  return data;
};
