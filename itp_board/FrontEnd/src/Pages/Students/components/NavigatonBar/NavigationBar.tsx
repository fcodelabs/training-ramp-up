import styled from "styled-components";
import {LogoutButton, UserName, Wrapper} from "./components/StyeledComponents";
import {signInUser_} from "../../../signIn/signInSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


const NavigationBar = ()=>{
    const dispatch = useDispatch();
    const handleClick=()=>{
        dispatch(signInUser_({
            firstName:'',
            lastName:'',
            email:"",
            admin:false,
            signIn:false}))
    }
    return(
        <Wrapper>
            <UserName>Yasith</UserName>
            <LogoutButton onClick={handleClick}>Sign Out</LogoutButton>
        </Wrapper>
    )
}
export default NavigationBar