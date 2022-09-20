import axios from "axios";

export async function signinUser(user: any){
    const res = axios.post("http://localhost:8000/user/login",user,{
        withCredentials: true,
      })
    return res;
}