import axios from "axios";

let data = [];

const generateid = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
    0
  ) + 1;

export const insertStudent = async (item) => {
  console.log(" 10.33 insert", item.dataItem);
  item.id = generateid(data);
  item.inEdit = false;

  if (
    !item.dataItem.name ||
    !item.dataItem.gender ||
    !item.dataItem.date ||
    !item.dataItem.mobile_number ||
    !item.dataItem.address
  ) {
    alert("Incorrect Validation");
  } else {
    console.log("Checking Date", typeof item.dataItem.date);
    data.unshift(item.dataItem);
    item.dataItem.age =
      new Date().getFullYear() - new Date(item.dataItem.date).getFullYear();
    console.log("Age", typeof item.age);
    const resdata = await axios.post(
      "http://localhost:8000/api",
      item.dataItem
    );

    return resdata;
  }
};
export const updateStudent = async (item) => {
  item.age = new Date().getFullYear() - new Date(item.date).getFullYear();
  await axios.put(`http://localhost:8000/api/${item.id}`, item);
};
export const deleteStudent = (item) => {
  const res = axios.delete(`http://localhost:8000/api/${item.id}`);

  return res;
};
export const getStudents = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api");
    //dispatch(studentSlice.actions.savePost(res));
    return res;
  } catch (e) {
    console.log(Error, e);
  }
};
