import {Person, Student} from "./types";
import {displayErrors} from "./toasts";

export async function fetchData(): Promise<Student[]|unknown> {
    try{
        const response = await fetch('http://localhost:4000/student')
        const json: Person[] = await response.json()
        const data: Student[] = [];
        json.forEach((item) => {
            data.push(
                {
                    id: item.id,
                    name: item.name,
                    gender: item.gender,
                    address: item.address,
                    mobileNo: item.mobileNo,
                    dateOfBirth: item.dateOfBirth,
                }
            )
        })
        return data;
    }catch (error:any) {
        console.error(error);
        displayErrors(['Unexpected Error'])
        return [];
    }
}

export const updateData = async (record: Student) => {
    try{
        const data = record
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
        const res = await fetch('http://localhost:4000/student', options)
        const json = await res.json()
        return json
    }catch (error) {
        console.error(error);
        displayErrors(['Unexpected Error']);
        return null;
    }
}

export const createData = async (record: Student) => {

    try {
        const data = record
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
        const res = await fetch('http://localhost:4000/student', options)
        const json = await res.json()
        return json
    }catch (error) {
        console.error(error);
        displayErrors(['Unexpected Error']);
        return null;
    }
}
export const deleteData = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:4000/student/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error(error);
        displayErrors(['Unexpected Error']);
        return null;
    }
}