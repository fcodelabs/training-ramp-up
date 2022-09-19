import { Students } from "../API/agent";

let data = [];

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

export const insertItem = (item) => {
  item.ID = generateId(data);
  item.inEdit = false;
  if (
    item.StudentName == null ||
    item.Address == null ||
    item.DOB == null ||
    item.MobileNo == null
  ) {
    alert("Please input valid data");
  } else {
    data.unshift(item);
    item.Age = new Date().getFullYear() - new Date(item.DOB).getFullYear();
  }

  const studentDetails = {
    StudentName: item.StudentName,
    Gender: item.Gender,
    Address: item.Address,
    MobileNo: item.MobileNo,
    DOB: item.DOB,
    Age: item.Age,
  };

  Students.create(studentDetails);
};

export const getItems = async () => {
  const res = await Students.list();
  console.log("Res data", res);
  return res;
};
export const updateItem = async (item) => {
  console.log("UpdateData", item);
  await Students.update(item, item.ID);
};
export const deleteItem = async (item) => {
  await Students.delete(item.ID);
};
