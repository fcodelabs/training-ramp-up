import {Student} from "../utils/types";
import axios, {axiosPrivate} from "../config/axiosConf";
import { store} from '../store';
import {studentData} from "../dummy";
import {editableInputTypes} from "@testing-library/user-event/dist/utils";




export async function fetchData(): Promise<Student[] | unknown> {
    const config = {
        method: 'get',
        url: `/students`,
    }
    const response = await axiosPrivate(config);
    const data: Student[] = response.data;
    return data;
}

export const updateData = async (record: Student) => {
    const state = store.getState();
    const editedFields = {...state.persistedReducer.studentData.editingFields,id:record.id};

    if(Object.keys(editedFields).length>1){
        await axiosPrivate({
            method: 'PATCH',
            url: `/students`,
            data:editedFields,
        })
    }


}

export const createData = async (record: Student) => {
       await axiosPrivate({
            method: 'POST',
            url: `/students`,
            data:record
        })
}
export const deleteData = async (id: number) => {
    await axiosPrivate({
        method: 'DELETE',
        url: `/students/${id}`,
    })
}