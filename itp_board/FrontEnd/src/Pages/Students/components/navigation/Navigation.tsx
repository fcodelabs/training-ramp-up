import {signOutUser} from "../../../signIn/signInSlice";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {LogoutButton, UserName, Wrapper} from "./styledComponents";

export const Navigation = ()=>{
    const dispatch = useAppDispatch();
    const firstName = useAppSelector(
        (state) => {
            return state.persistedReducer.userData.firstName;
        }
    );
    const lastName = useAppSelector(
        (state) => {
            return state.persistedReducer.userData.lastName;
        }
    );
    const handClick=()=>{
        dispatch(signOutUser());
    }
    return(
        <Wrapper>
            <UserName>{firstName} {lastName}</UserName>
            <LogoutButton onClick={handClick}>LogOut</LogoutButton>
        </Wrapper>
    )
}