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
