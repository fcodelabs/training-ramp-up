import { Student } from "../util/temp-data";

export function deleteStudent(id:number,dummy_data:Student[]){
    let index = dummy_data.findIndex((student)=>student.id===id);
    let deletedStudent = dummy_data.splice(index,1);
    return deletedStudent;
}