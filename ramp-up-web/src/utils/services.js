import { sampleData } from "../SampleData";
let data = [...sampleData];

const generateId = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.ID),
    0,
  ) + 1;

export const insertItem = (item) => {
  item.ID = generateId(data);
  item.inEdit = false;

  if (
    item.Name == null ||
    item.Gender == null ||
    item.Birth == null ||
    item.MobileNo == null ||
    item.Address == null
  ) {
    alert("Incorrect Validation");
  } else {
    data.unshift(item);
    console.log(item.Gender);
    const year = new Date().getFullYear();
    const userYear = new Date(item.Birth).getFullYear();
    console.log("age", year - userYear);
    item.Age = year - userYear;
  }
  return data;
};
export const getItems = () => {
  return data;
};
export const updateItem = (item) => {
  let index = data.findIndex((record) => record.ID === item.ID);
  data[index] = item;
  return data;
};
export const deleteItem = (item) => {
  let index = data.findIndex((record) => record.ID === item.ID);
  data.splice(index, 1);
  return data;
};
