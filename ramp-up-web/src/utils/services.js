//import { sampleData } from "../SampleData";
//let data = [...sampleData];
import axios from "axios";
//import useState from "react";

let data = [];

const generateId = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.ID),
    0,
  ) + 1;

export const insertItem = async (item) => {
  item.ID = generateId(data);
  item.inEdit = false;

  if (
    !item.Name ||
    !item.Gender ||
    !item.Birth ||
    !item.MobileNo ||
    !item.Address
  ) {
    alert("Incorrect Validation");
  } else {
    data.unshift(item);
    item.Age = new Date().getFullYear() - new Date(item.Birth).getFullYear();
    console.log("Age", typeof item.Age);
    const resdata = await axios.post("http://localhost:8000", item);
    return resdata;
  }
};
export const updateItem = async (item) => {
  await axios.put(`http://localhost:8000/${item.ID}`, item);
};
export const deleteItem = (item) => {
  const res = axios.delete(`http://localhost:8000/${item.ID}`);

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
