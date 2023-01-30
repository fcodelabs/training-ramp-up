import styled from "styled-components";
import {signInUser_} from "../../../signIn/signInSlice";
import {useDispatch} from "react-redux";


const NavigationBar = () => {
    const Wrapper = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 5vh;
      width: 100vw;
      background-color: #010456;
    `

    const UserName = styled.h3`
      color: aliceblue;
      margin: 5px;
      padding: 5px;
    `
    const LogoutButton = styled.button`
      width: 5%;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      font-size: 13px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin: 5px;

      &:hover {
        background-color: #3e8e41;
      }
    `;


    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(signInUser_({
            firstName: '',
            lastName: '',
            email: "",
            admin: false,
            signIn: false
        }))
    }
    return (
        <Wrapper>
            <UserName>Yasith</UserName>
            <LogoutButton onClick={handleClick}>Sign Out</LogoutButton>
        </Wrapper>
    )
}
export default NavigationBar