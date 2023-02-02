import {ResponseObj, Student, User, UserCredetial} from "../utils/types";
import {displayErrors} from "../utils/toasts";
import axios from "axios";



export const checkCredentials = async (credentials:UserCredetial) =>{
    const {email,password} = credentials;
    try {
        // const options = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({email,password}),
        // }
        const config = {
            method: 'post',
            url: 'http://localhost:4000/user/login',
            data:{
                email,
                password
            }
        }
        // const res = await fetch(`http://localhost:4000/user/login`,options);
        const response = await axios(config);
        console.log(response);
        // const json:ResponseObj = await res.json();
        // if(typeof res === 'undefined'){
        //     throw new Error('Server Response Failed!');
        // }

        return response.data;
    }catch (error){
        console.error(error);
        return null;
    }
}
export const createUserData = async (record: User) => {

    try {
        const {email,
            firstName,
            lastName,
            password,
            admin} = record
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email,
                firstName,
                lastName,
                password,
                admin}),
        }
        const res = await fetch('http://localhost:4000/user', options)
        const json = await res.json()
        if(res===null){
            throw new Error('Server Response Failed!')
        }
        return json
    }catch (error) {
        console.error(error);
        displayErrors(['Unexpected Error']);
        return null;
    }
}