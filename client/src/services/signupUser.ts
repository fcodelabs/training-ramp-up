import axios from "axios";

export async function signupUser(user: any){
    const res = axios.post("http://localhost:8000/user/register",user)
    return res;
}