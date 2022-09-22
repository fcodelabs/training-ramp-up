import axios from "axios";

export function signoutUser({sessionId}:any){
    const res = axios.delete(`http://localhost:8000/user/logout/${sessionId}`,{
        withCredentials: true,
      });
    return res;
}

export function signinUser(data:any){
    const res = axios.post("http://localhost:8000/user/login",data,{
        withCredentials: true,
      });
    return res;
}

export function signupUser(data: any){
    console.log('we are at user sign up',data)
    const res = axios.post("http://localhost:8000/user/register",data,{
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