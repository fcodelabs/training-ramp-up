import axios from "../config/axiosConf";


const useRefreshToken = ()=>{
    const refresh = async ()=>{


        const response = await axios({
            method:'post',
            url:`/refreshtoken`,
            data:{
                refreshToken:localStorage.getItem('refreshToken')
            }
    });
        const {token,refreshToken} = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        return token;
    }
    return refresh;
}
export default useRefreshToken;