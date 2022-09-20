import axios from "axios";

export function signoutUser(sessionId:string){
    const res = axios.delete(`http://localhost:8000/user/logout/${sessionId}`);
    return res;
}

export function signinUser(user: any){
    const res = axios.post("http://localhost:8000/user/login",user,{
        withCredentials: true,
      });
    return res;
}

export function signupUser(user: any){
    const res = axios.post("http://localhost:8000/user/register",user,{
        withCredentials: true,
      });
    return res;
}

export function signinStatus(){
    const res = axios.get("http://localhost:8000/user/status",{
        withCredentials:true
    });

    return res;
}