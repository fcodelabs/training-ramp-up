import axios from "axios";

let data = [];
const config = {
  headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
};

// const generateId = (data) =>
//   data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

export const insertStudent = async (student) => {
  // student.ID = generateId(data);
  student.inEdit = false;
  if (
    student.dataItem.studentName == null ||
    student.dataItem.address == null ||
    student.dataItem.dob == null ||
    student.dataItem.mobileNo == null
  ) {
    alert("Please input valid data");
  } else {
    data.unshift(student.dataItem);
    student.dataItem.age =
      new Date().getFullYear() - new Date(student.dataItem.dob).getFullYear();
  }

  const studentDetails = {
    studentName: student.dataItem.studentName,
    gender: student.dataItem.gender,
    address: student.dataItem.address,
    mobileNo: student.dataItem.mobileNo,
    dob: student.dataItem.dob,
    age: student.dataItem.age,
  };

  await axios.post("http://localhost:8080/students", studentDetails,config);
};

export const getStudents = async () => {
  const res = await axios.get("http://localhost:8080/students",config);

  return res;
};
export const updateStudent = async (student) => {
  await axios.put(`http://localhost:8080/students/${student.ID}`, student,config);
};
export const deleteStudent = async (student) => {
  await axios.delete(`http://localhost:8080/students/${student.ID}`,config);
};
