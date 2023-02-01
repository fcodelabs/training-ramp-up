import {Person, Student} from "../utils/types";
import {displayErrors} from "../utils/toasts";
import {axiosInstance} from "../utils/Axios";
import axios from "axios";

export async function fetchData(): Promise<Student[] | unknown> {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/student`);
    const data: Student[] = response.data;
    return data;
}

export const updateData = async (record: Student) => {
    await axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/student`,
        data:record
    })

}

export const createData = async (record: Student) => {
       await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BACKEND_BASE_URL}/student`,
            data:record
        })
}
export const deleteData = async (id: number) => {
    await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/student/${id}`,
    })
}