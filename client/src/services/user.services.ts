import axios from "axios";

export async function signoutUser(email:string){
    const res = axios.put("http://localhose:8000/user/logout",email);
    return res;
}