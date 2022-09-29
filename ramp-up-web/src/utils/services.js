import axios from "axios";

let data = [];
const config = {
  headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
};

const generateid = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
    0
  ) + 1;

export const insertStudent = async (item) => {
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
  } else if (
    item.dataItem.gender == "Male" ||
    item.dataItem.gender == "Female"
  ) {
    if (item.dataItem.mobile_number.length == 10) {
      data.unshift(item.dataItem);
      item.dataItem.age =
        new Date().getFullYear() - new Date(item.dataItem.date).getFullYear();
      const resdata = await axios.post(
        "http://localhost:8000/api",
        item.dataItem,
        config
      );

      return resdata;
    } else {
      alert("Mobile number must be 10 numbers");
    }
  } else {
    alert("please Check gender");
  }
};

export const updateStudent = async (item) => {
  item.age = new Date().getFullYear() - new Date(item.date).getFullYear();
  await axios.put(`http://localhost:8000/api/${item.id}`, item, config);
};

export const deleteStudent = (item) => {
  const res = axios.delete(`http://localhost:8000/api/${item.id}`, config);

  return res;
};

export const getStudents = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api", config);
    return res;
  } catch (e) {
    console.log(Error, e);
  }
};
