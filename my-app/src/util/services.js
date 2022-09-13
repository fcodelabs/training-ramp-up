//import dummy data
import studentData from "../data/students.js";

const generateId = data => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;
const calcAge =(dateString)=>{
    console.log(dateString)
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    console.log(age)
    return age;
}
export const insertItem = item =>{
    item.id=generateId(studentData);
    item.age = calcAge(item.dob)
    item.inEdit = false;
    studentData.unshift(item);
    return studentData
}

export const getItems =()=>{
    return studentData
}

export const updateItem = item =>{
    let idx = studentData.findIndex(record => record.id === item.id);
    studentData[idx]=item;
    return studentData;
}

export const deleteItem = (item,data) =>{
    let idxr = data.findIndex(record =>record.id === item.id);
    let newData = data.filter((_,idx)=>idx!==idxr);
    return newData;
}