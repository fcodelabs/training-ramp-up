import {Student} from "../utils/types";
import axios, {axiosPrivate} from "../config/axiosConf";



export async function fetchData(): Promise<Student[] | unknown> {
    const config = {
        method: 'get',
        url: `/student`,
    }
    const response = await axiosPrivate(config);
    const data: Student[] = response.data;
    return data;
}

export const updateData = async (record: Student) => {
    await axiosPrivate({
        method: 'PUT',
        url: `/student`,
        data:record,
    })

}

export const createData = async (record: Student) => {
       await axiosPrivate({
            method: 'POST',
            url: `/student`,
            data:record
        })
}
export const deleteData = async (id: number) => {
    await axiosPrivate({
        method: 'DELETE',
        url: `/student/${id}`,
    })
}