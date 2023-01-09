import Cookies from "universal-cookie";

const cookies = new Cookies();

const isLoggedIn =():boolean=>{
    const singedUser=cookies.get('user')

    return (singedUser)? true :false
}


const checkPersmission =():boolean=>{
    const singedUser=cookies.get('user')

    return (!singedUser)? false :(singedUser.role=='ADMIN')?true:false
}