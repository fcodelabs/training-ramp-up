//import dummy data
import studentData from "../data/students.json";

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