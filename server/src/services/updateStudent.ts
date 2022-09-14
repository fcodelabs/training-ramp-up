import { Student,StudentData } from "../util/temp-data";

export function updateStudent(id:number,data:StudentData,dummy_data:Student[]){
    let index = dummy_data.findIndex((student)=>student.id===id);
    let updatedStudent:Student = {id,...data};
    dummy_data[index]= updatedStudent;
    return updatedStudent;
}