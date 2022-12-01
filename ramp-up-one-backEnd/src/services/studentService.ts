//temp data array
const tempArray = [
  {
    ID: 1,
    name: 'kamal',
    gender: 'male',
    Address: 'colombo',
    MobileNo: '01124455874',
    birth: '1/14/2002',
    Age: 22,
  },
  {
    ID: 2,
    name: 'nimal',
    gender: 'male',
    Address: 'colombo',
    MobileNo: '01124455874',
    birth: '2/24/2003',
    Age: 22,
  },
];

//get all student
export const getAllCustomerService = () => {
  return tempArray;
};

//save Student
export const saveStudentService = (
  data:any
) => {
  tempArray.push({
    ID: data.ID,
    name: data.name,
    gender: data.gender,
    Address: data.Address,
    MobileNo: data.MobileNo,
    birth: data.birth,
    Age: data.Age,
  });
  return tempArray;
};

//update Student
export const updateStudentService = (
  data:any
) => {
  for (let i = 0; i < tempArray.length; i++) {
    
    if (tempArray[i].ID === data.ID) {
      tempArray[i].name = data.name;
      tempArray[i].Address = data.Address;
      tempArray[i].gender = data.gender;
      tempArray[i].MobileNo = data.MobileNo;
      tempArray[i].birth = data.birth;
      tempArray[i].Age = data.Age;
    }
  }
  return tempArray;
};

//delete Student
export const deleteStudentService = (ID: number) => {
  for (let i = 0; i < tempArray.length; i++) {
    console.log(ID);
    if (tempArray[i].ID === ID) {
      tempArray.splice(i, 1);
    }
  }
  return tempArray;
};
