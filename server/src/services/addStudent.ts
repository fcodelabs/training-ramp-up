import { Student,StudentData } from "../util/temp-data";

//generate new id
const generateId = (data:Student[]) => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export function addStudent(data:StudentData,dummy_data:Student[]):{}{
    const id:number = generateId(dummy_data)
    const newStudent:Student = {id,...data} 
    dummy_data.push(newStudent);
    return newStudent;
}