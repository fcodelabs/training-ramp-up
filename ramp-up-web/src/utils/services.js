let data = [];

const generateId = (data) =>
  data.reduce((acc, current) => Math.max(acc, current.StudentID), 0) + 1;

export const insertStudent = (item) => {
  item.StudentID = generateId(data);
  item.inEdit = false;

  if (
    item.StudentName == null ||
    item.Gender == null ||
    item.ContactNumber == null ||
    item.Address == null
  ) {
    alert("Incorrect Validation");
  } else {
    data.unshift(item);
    console.log(item.Gender);
    //const year = new Date().getFullYear();
    //const userYear = new Date(item.Birth).getFullYear();
    item.Age = new Date().getFullYear() - new Date(item.Birth).getFullYear();
  }
  return data;
};

export const getStudents = () => {
  return data;
};

export const updateStudent = (item) => {
  let index = data.findIndex((record) => record.StudentID === item.StudentID);
  data[index] = item;
  return data;
};

export const deleteStudent = (item) => {
  let index = data.findIndex((record) => record.StudentID === item.StudentID);
  data.splice(index, 1);
  return data;
};
