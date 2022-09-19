import axios from "axios";

let data = [];

const generateid = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
    0,
  ) + 1;

export const insertItem = async (item) => {
  item.id = generateid(data);
  item.inEdit = false;

  if (
    !item.name ||
    !item.gender ||
    !item.birth ||
    !item.mobileNo ||
    !item.address
  ) {
    alert("Incorrect Validation");
  } else {
    data.unshift(item);
    item.age = new Date().getFullYear() - new Date(item.birth).getFullYear();
    console.log("Age", typeof item.age);
    const resdata = await axios.post("http://localhost:8000", item);
    return resdata;
  }
};
export const updateItem = async (item) => {
  if (
    !item.name ||
    !item.gender ||
    !item.birth ||
    !item.mobileNo ||
    !item.address
  ) {
    alert("Incorrect Validation");
  } else {
    const res = await axios.put(`http://localhost:8000/${item.id}`, item);
    return res;
  }
};
export const deleteItem = (item) => {
  const res = axios.delete(`http://localhost:8000/${item.id}`);

  return res;
};
export const getItems = async () => {
  try {
    const res = await axios.get("http://localhost:8000");
    return res;
  } catch (e) {
    console.log(Error, e);
  }
};
