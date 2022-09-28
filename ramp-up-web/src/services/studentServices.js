import axios from "axios";

let data = [];

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

export const insertItem = async (item) => {
  item.ID = generateId(data);
  item.inEdit = false;
  if (
    item.dataItem.StudentName == null ||
    item.dataItem.Address == null ||
    item.dataItem.DOB == null ||
    item.dataItem.MobileNo == null
  ) {
    alert("Please input valid data");
  } else {
    data.unshift(item.dataItem);
    item.dataItem.Age =
      new Date().getFullYear() - new Date(item.dataItem.DOB).getFullYear();
  }

  const studentDetails = {
    StudentName: item.dataItem.StudentName,
    Gender: item.dataItem.Gender,
    Address: item.dataItem.Address,
    MobileNo: item.dataItem.MobileNo,
    DOB: item.dataItem.DOB,
    Age: item.dataItem.Age,
  };

  await axios.post("http://localhost:8080/students", studentDetails);
};

export const getItems = async () => {
  const res = await axios.get("http://localhost:8080/students");

  return res;
};
export const updateItem = async (item) => {
  await axios.put(`http://localhost:8080/students/${item.ID}`, item);
};
export const deleteItem = async (item) => {
  await axios.delete(`http://localhost:8080/students/${item.ID}`);
};
