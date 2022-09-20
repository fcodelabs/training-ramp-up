import axios from "axios";

let data = [];

const generateid = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
    0
  ) + 1;

export const insertStudent = async (item) => {
  item.id = generateid(data);
  item.inEdit = false;

  if (
    !item.name ||
    !item.gender ||
    !item.date ||
    !item.mobile_number ||
    !item.address
  ) {
    alert("Incorrect Validation");
  } else {
    console.log("Checking Date", typeof item.date);
    data.unshift(item);
    item.age = new Date().getFullYear() - new Date(item.date).getFullYear();
    console.log("Age", typeof item.age);
    const resdata = await axios.post("http://localhost:8000/api", item);

    return resdata;
  }
};
export const updateStudent = async (item) => {
  console.log("Update URL Working");
  await axios.put(`http://localhost:8000/api/${item.id}`, item);
};
export const deleteStudent = (item) => {
  const res = axios.delete(`http://localhost:8000/api/${item.id}`);

  return res;
};
export const getStudents = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api");

    return res;
  } catch (e) {
    console.log(Error, e);
  }
};
